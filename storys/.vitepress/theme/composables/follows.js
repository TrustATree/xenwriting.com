import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

/*
  Client-side follow store. Everything lives in the reader's localStorage:
    { [storyKey]: <unix time of the newest chapter they've seen> }
  The newest chapter time per story comes from themeConfig.storyUpdates
  (generated at build time from git history, see story-updates.mjs).
*/

const STORAGE_KEY = 'xenwriting:follows:v1'

const followed = ref({})
let loaded = false

function read() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    followed.value = parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    followed.value = {}
  }
}

function write() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(followed.value))
  } catch {
    /* storage blocked or full: follows just won't persist */
  }
}

// Loaded after mount (never during SSR/hydration) so the first client render
// matches the prerendered HTML.
function ensureLoaded() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  read()
  // keep other open tabs in sync
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY || e.key === null) read()
  })
}

/** '/second-hand/', 'txp/index.md', '/The%20Quest%20To%20Revive' -> story folder name */
export function storyKeyFromPath(path) {
  if (!path) return ''
  const first = path.replace(/^\/+/, '').split('/')[0].replace(/\.(html|md)$/, '')
  try {
    return decodeURIComponent(first)
  } catch {
    return first
  }
}

export function useFollows() {
  const { theme } = useData()
  onMounted(ensureLoaded)

  const updates = computed(() => theme.value.storyUpdates || {})

  const isStory = (key) => !!updates.value[key]
  const isFollowing = (key) => key in followed.value
  const latest = (key) => updates.value[key]?.time ?? 0
  const hasNew = (key) => isFollowing(key) && latest(key) > (followed.value[key] || 0)

  function follow(key) {
    // start "caught up", so the light only fires for chapters added after this
    followed.value = { ...followed.value, [key]: latest(key) || Math.floor(Date.now() / 1000) }
    write()
  }

  function unfollow(key) {
    const { [key]: _removed, ...rest } = followed.value
    followed.value = rest
    write()
  }

  function markSeen(key) {
    if (!isFollowing(key)) return
    followed.value = { ...followed.value, [key]: latest(key) }
    write()
  }

  return { ensureLoaded, updates, isStory, isFollowing, hasNew, latest, follow, unfollow, markSeen }
}
