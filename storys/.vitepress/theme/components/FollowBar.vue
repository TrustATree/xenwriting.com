<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { storyKeyFromPath, useFollows } from '../composables/follows'

const { page } = useData()
const { ensureLoaded, isStory, isFollowing, hasNew, latest, follow, unfollow, markSeen } = useFollows()

const key = computed(() => storyKeyFromPath(page.value.relativePath))
const show = computed(() => isStory(key.value))
const following = computed(() => isFollowing(key.value))

// Snapshot taken when the page opens, so the "new chapter" note survives the
// light being cleared by markSeen().
const hadNew = ref(false)

function onVisit() {
  hadNew.value = hasNew(key.value)
  markSeen(key.value)
}

onMounted(() => {
  ensureLoaded()
  onVisit()
})
watch(key, () => {
  ensureLoaded()
  onVisit()
})

// fixed locale + UTC so server and client render the same text
const lastUpdated = computed(() => {
  const t = latest(key.value)
  return t
    ? new Intl.DateTimeFormat('en-AU', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(t * 1000))
    : ''
})

function toggle() {
  if (following.value) {
    unfollow(key.value)
    hadNew.value = false
  } else {
    follow(key.value)
  }
}
</script>

<template>
  <div v-if="show" class="follow-bar">
    <button
      type="button"
      class="follow-btn"
      :class="{ active: following }"
      :aria-pressed="following"
      @click="toggle"
    >
      <FontAwesomeIcon :icon="faBell" />
      <span>{{ following ? 'Following' : 'Follow' }}</span>
    </button>
    <span v-if="hadNew && following" class="follow-note" role="status">
      <span class="follow-dot" aria-hidden="true" /> New chapter since your last visit
    </span>
    <span v-else-if="lastUpdated" class="follow-meta">Last updated {{ lastUpdated }}</span>
  </div>
</template>

<style scoped>
.follow-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.follow-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 14px;
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s, color 0.25s;
}

.follow-btn:hover {
  border-color: var(--xen-new-chapter);
}

.follow-btn.active {
  border-color: var(--xen-new-chapter);
  color: var(--xen-new-chapter);
}

.follow-meta,
.follow-note {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.follow-note {
  color: var(--xen-new-chapter);
  font-weight: 600;
}

.follow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--xen-new-chapter);
  box-shadow: 0 0 6px 1px var(--xen-new-chapter);
}
</style>
