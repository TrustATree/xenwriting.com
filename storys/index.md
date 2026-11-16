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
  "Charlie is one of only 2 Discord moderators to know Xen's real name",
  "The team consists of 3 members, 2 of which are furries.",
  "2/3 members of the team know all metro train models in Melbourne.",
  "Hat_nal accidentally face revealed once- but the video has been deleted.",
  "The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.",
  "This website started out very shittily coded. It still is.",
  ":3",
  "Hat_nal didn't respond when we asked him for his favourite colour, but Xen's is purple and Charlie's is orange",
  "I'm trapped in the fish dimension",
  "Xen has never beaten Minecraft",
  "Hat_nal took 9 minutes to name 26 vocaloids he knows",
  "Hat_nal coded the snake button and nothing else",
  "Hat_nal randomly met Xen's childhood friend at school and they're still friends to this day!",
  "Hat_nal + Xen = Yonkagor",
  "Xen spent 3 hours straight trying to load into 'Skate.' and the game didn't even load",
  "Charlie is in the top 14.9% of Beat Saber players, and Xen is in the top 28% of Osu players.",
  "At the age of 13, Xen once passed as an adult to sneak into a very adult comedy show.",
  "Xen is semi-ambidexterous.",
  "Charlie and Hat_nal were in a group chat alone for over a month!",
  "Xen has 100%'d all three 'Class of '09' games",
  "There are currently 59 lines of code on this page"
]

const fact = ref('')

onMounted(() => {
  fact.value = funFacts[Math.floor(Math.random() * funFacts.length)]
})
</script>

Welcome to [XenWriting.com](https://xenwriting.com)! Enjoy your stay!

Stories are accessible in the top right, by hovering over "Stories by TreeXen" and selecting the story you wish to read, or on mobile, by clicking the hamburger icon (☰), opening the dropdown for "Stories by TreeXen" and selecting the story you wish to read. Please note that this site has moderate use of profanity, and viewer's discretion is advised.
::: tip
**Fun fact:** <span>{{ fact }}</span>
:::
<button style="background-color: #5050AF; padding-left: 5px; padding-right: 5px; border-radius:5px;" onclick="window.location.href='snake.html'">Snake Game</button>

<button style="background-color: #5050AF; padding-left: 5px; padding-right: 5px; border-radius:5px;" onclick="window.location.href='minesweeper.html'">Minesweeper</button>

<button style="background-color: #5050AF; padding-left: 5px; padding-right: 5px; border-radius:5px;" onclick="window.location.href='tetris.html'">Tetris</button>
