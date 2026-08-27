import DefaultTheme from 'vitepress/theme'
import SnakeGame from './components/SnakeGame.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SnakeGame', SnakeGame)
  }
}
