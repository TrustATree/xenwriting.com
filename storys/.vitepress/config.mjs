import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'

export default defineConfig({
  title: "TreeXen's Storys",
  description: "Storys written by TreeXen",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  sitemap: {
    hostname: 'https://xenwriting.com'
  },
  themeConfig: {
    socialLinks: [
      { icon: 'discord', link: 'https://discord.com/invite/et2Yyyn62p' },
      { icon: 'github', link: 'https://github.com/TrustATree/xenwriting.com' }
    ],
    nav: [
      { text: 'Home/Introduction', link: '/' },
      { text: 'Second Hand', link: '/second-hand/' },
      { text: 'The Xen Paradox', link: '/txp' },
      { text: 'A Drone With Emotions', link: '/adwe' }
    ],
    sidebar: [
      {
        text: 'Storys by TreeXen',
        items: [
          { text: 'Second Hand', link: '/second-hand/' },
          { text: 'The Xen Paradox', link: '/txp' },
          { text: 'A Drone With Emotions', link: '/adwe' }
        ]
      }
    ],
    docFooter: {
      prev: false,
      next: false
    },
    footer: {
      items: [
        { text: 'Source Code', link: 'https://github.com/TrustATree/xenwriting.com' },
        { text: 'Discord', link: 'https://discord.com/invite/et2Yyyn62p' }
        ],
      copyright: 'Copyright © 2026 TreeXen'
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPHero.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFooter.vue', import.meta.url)
          )
        }
      ]
    }
  },
  markdown: {
    config: (md) => {
      md.use(container, "tabs", {
        render: (tokens, idx) => {
          const token = tokens[idx];
          if (token.nesting === 1) {
            return `<Tabs ${token.info}>\n`;
          } else {
            return `</Tabs>\n`;
          }
        }
      });
      md.use(container, 'tab', {
        render: (tokens, idx) => {
          const token = tokens[idx];
          if (token.nesting === 1) {
            let tokenData = token.info.match(/^ ?tab\s(default\s)?(.*)$/);
            let isDefault = typeof tokenData[1] !== 'undefined';
            let name = tokenData[2];
            return `<Tab name="${name}" ${isDefault ? "default=true" : ""}>`;
          } else {
            return `</Tab>\n`;
          }
        }
      });
    }
  }
})
