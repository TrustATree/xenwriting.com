/*
  Copyright (C) 2024 Nintendo Homebrew
  SPDX-License-Identifier: MIT
*/

import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

/* FontAwesome stuff */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnet } from '@fortawesome/free-solid-svg-icons'
library.add(faMagnet)

import Tab from './components/Tab.vue'
import Tabs from './components/Tabs.vue'
import FollowBar from './components/FollowBar.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // follow button + "new chapter" note at the top of every story
      'doc-before': () => h(FollowBar)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('font-awesome-icon', FontAwesomeIcon),
    app.component('Tab', Tab),
    app.component('Tabs', Tabs)
  }
}
