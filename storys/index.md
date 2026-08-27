---
layout: home
title: "TreeXen's Story's"
hero:
  text: "TreeXen's Story's"
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
  "The team consists of 3 members, 2 of which are furries.",
  "2/3 members of the team know all metro train models in Melbourne.",
  "Hat_nal accidentally face revealed once- but the video has been deleted.",
  "The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.",
  "This website started out very shittily coded.",
  "Xen doesn't know how to use punctuation.",
  ":3"
]

const fact = ref('')

onMounted(() => {
  fact.value = funFacts[Math.floor(Math.random() * funFacts.length)]
})
</script>

This is still a work in progress, But welcome to [XenWriting.com](https://xenwriting.com)! Enjoy your stay!
::: tip
**Fun fact:** <span>{{ fact }}</span>
:::
<button style="background-color: #5050AF; padding-left: 5px; padding-right: 5px; border-radius:5px;" onclick="window.location.href='snake.html'">Snake Game</button>
