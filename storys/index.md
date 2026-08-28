---
layout: home
title: "TreeXen's Stories"
hero:
  text: "TreeXen's Stories"
  tagline: "Stories written by TreeXen"
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
  ":3",
  "Hat_nal didn't respond when we asked him for his favourite colour, but Xen's is purple and Charlie's is orange",
  "I'm trapped in the fish dimension",
  "Charlie gets increasingly mad at Hat_nal and Xen for changing anything in the source code",
  "Xen has never beaten Minecraft",
  "Hat_nal took 9 minutes to name 26 vocaloids he knows",
  "Hat_nal coded the snake button and nothing else",
  "Hat_nal once got mad at Xen for taking too long to install Git."
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
<button style="background-color: #5050AF; padding-left: 5px; padding-right: 5px; border-radius:5px;" onclick="window.location.href='minesweeper.html'">Minesweeper</button>
