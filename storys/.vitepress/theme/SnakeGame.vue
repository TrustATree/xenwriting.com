<template>
  <div style="display: flex; justify-content: flex-start;">
    <button class="snake-widget-btn" @click="toggle">
      {{ expanded ? 'Close snake' : 'Play snake' }}
    </button>
  </div>

  <div v-if="expanded" style="margin-top: 12px; max-width: 340px;">
    <div class="card">
      <div class="top-row">
        <span>Score: <strong>{{ score }}</strong></span>
        <button class="small" @click="reset">Restart</button>
      </div>
      <canvas ref="canvas" width="264" height="264"></canvas>
      <p class="status">{{ status }}</p>
      <div class="dpad">
        <div></div>
        <button aria-label="up" @click="setDir(0,-1)">&#8593;</button>
        <div></div>
        <button aria-label="left" @click="setDir(-1,0)">&#8592;</button>
        <button aria-label="down" @click="setDir(0,1)">&#8595;</button>
        <button aria-label="right" @click="setDir(1,0)">&#8594;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const N = 11
const cellSize = 264 / N
const colors = {
  bg: '#f1efe8',
  snake: '#0F6E56',
  head: '#085041',
  food: '#D85A30',
  grid: '#d3d1c7'
}

const expanded = ref(false)
const score = ref(0)
const status = ref('Use arrow keys, WASD, or the buttons below')
const canvas = ref(null)

let ctx, snake, dir, nextDir, food, alive, timer

function toggle() {
  expanded.value = !expanded.value
  if (expanded.value) {
    // wait for canvas to mount
    setTimeout(reset, 0)
  } else if (timer) {
    clearInterval(timer)
  }
}

function reset() {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  snake = [{x:5,y:5},{x:4,y:5},{x:3,y:5}]
  dir = {x:1,y:0}
  nextDir = {x:1,y:0}
  score.value = 0
  alive = true
  status.value = 'Use arrow keys, WASD, or the buttons below'
  placeFood()
  draw()
  if (timer) clearInterval(timer)
  timer = setInterval(tick, 220)
}

function placeFood() {
  let valid = false
  while (!valid) {
    food = {x: Math.floor(Math.random()*N), y: Math.floor(Math.random()*N)}
    valid = !snake.some(s => s.x===food.x && s.y===food.y)
  }
}

function tick() {
  if (!alive) return
  dir = nextDir
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y}
  if (head.x < 0 || head.x >= N || head.y < 0 || head.y >= N || snake.some(s => s.x===head.x && s.y===head.y)) {
    alive = false
    clearInterval(timer)
    status.value = 'Game over — final score ' + score.value
    return
  }
  snake.unshift(head)
  if (head.x === food.x && head.y === food.y) {
    score.value += 1
    placeFood()
  } else {
    snake.pop()
  }
  draw()
}

function draw() {
  if (!ctx) return
  ctx.fillStyle = colors.bg
  ctx.fillRect(0, 0, 264, 264)
  ctx.strokeStyle = colors.grid
  ctx.lineWidth = 0.5
  for (let i = 0; i <= N; i++) {
    ctx.beginPath(); ctx.moveTo(i*cellSize, 0); ctx.lineTo(i*cellSize, 264); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, i*cellSize); ctx.lineTo(264, i*cellSize); ctx.stroke()
  }
  ctx.fillStyle = colors.food
  ctx.beginPath()
  ctx.arc(food.x*cellSize + cellSize/2, food.y*cellSize + cellSize/2, cellSize*0.35, 0, Math.PI*2)
  ctx.fill()
  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? colors.head : colors.snake
    ctx.fillRect(s.x*cellSize + 1, s.y*cellSize + 1, cellSize - 2, cellSize - 2)
  })
}

function setDir(x, y) {
  if (dir.x === -x && dir.y === -y) return
  nextDir = {x, y}
}

function onKeydown(e) {
  if (!expanded.value) return
  const key = e.key.toLowerCase()
  if (key === 'arrowup' || key === 'w') { setDir(0,-1); e.preventDefault() }
  else if (key === 'arrowdown' || key === 's') { setDir(0,1); e.preventDefault() }
  else if (key === 'arrowleft' || key === 'a') { setDir(-1,0); e.preventDefault() }
  else if (key === 'arrowright' || key === 'd') { setDir(1,0); e.preventDefault() }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', onKeydown)
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<style scoped>
.snake-widget-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 14px;
  font-family: inherit;
  background: var(--vp-c-bg-soft, #fff);
  color: var(--vp-c-text-1, #000);
  border: 1px solid var(--vp-c-divider, #d3d1c7);
  border-radius: 8px;
  cursor: pointer;
}
.snake-widget-btn:hover {
  background: var(--vp-c-bg-alt, #f1efe8);
}
.card {
  background: var(--vp-c-bg-soft, #fff);
  border: 1px solid var(--vp-c-divider, #d3d1c7);
  border-radius: 12px;
  padding: 1rem;
}
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}
button.small {
  padding: 4px 10px;
  font-size: 13px;
  border: 1px solid var(--vp-c-divider, #d3d1c7);
  border-radius: 6px;
  background: var(--vp-c-bg-soft, #fff);
  cursor: pointer;
}
canvas {
  display: block;
  border-radius: 8px;
}
.status {
  font-size: 13px;
  color: var(--vp-c-text-2, #5f5e5a);
  margin: 8px 0 0;
  text-align: center;
}
.dpad {
  display: grid;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: repeat(2, 36px);
  gap: 4px;
  justify-content: center;
  margin-top: 10px;
}
.dpad button {
  border: 1px solid var(--vp-c-divider, #d3d1c7);
  border-radius: 6px;
  background: var(--vp-c-bg-soft, #fff);
  cursor: pointer;
}
</style>
