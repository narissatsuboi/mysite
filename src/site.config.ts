import type { UserConfig } from './types'

export const defaultConfig: UserConfig = {
  title:       'Narissa Tsuboi',
  description: 'Talks, conferences, and things I\'ve learned',
  url:         'https://narissatsuboi.com',

  author: {
    name: 'Narissa Tsuboi',
  },

  navigation: [
    { title: 'Blog',  url: '/blog' },
    { title: 'Talks', url: '/talks' },
    { title: 'About',   url: '/about' },
  ],

  footerLinks: [
    { title: 'RSS',      url: '/rss.xml' },
  ],

  social: [],

  tagline:      'talks · conferences · learnings',
}