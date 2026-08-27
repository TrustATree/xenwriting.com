---
layout: home
title: "TreeXen's Storys"
hero:
  text: "TreeXen's Storys"
  tagline: "Story's written by TreeXen"
---

<script setup>
import { ref, onMounted } from 'vue'

const funFacts = [
  "Xen can program but not code.",
  "Xen has an irrational love for oranges and hot chips.",
  "Xen created a conlang and refuses to teach anyone.",
  "Xen has played Geometry Dash for over 950 hours!",
  "Charlie is the only Discord moderator to know Xen's real name.",
  "You can join Xen's discord server at [this link](https://discord.com/invite/et2Yyyn62p)!"
]

const fact = ref('')

onMounted(() => {
  fact.value = funFacts[Math.floor(Math.random() * funFacts.length)]
})
</script>

This is still a work in progress, But welcome to [XenWriting.com](https://xenwriting.com)!
Currently we only have [Second Hand](./second-hand/), but more should be added soon!
::: tip
**Fun fact:** <span>{{ fact }}</span>
:::
