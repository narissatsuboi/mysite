import type { UserConfig } from './types'

export const defaultConfig: UserConfig = {
  title:       'Patrika',
  description: 'A field notebook, kept in the open',
  url:         'https://example.com',
  locale:      'en',

  author: {
    name: 'Your Name',
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

  heroText:     'A field notebook, kept in the open',
  tagline:      'talks · conferences · learnings',
  postsPerPage: 10,
  recentPosts:  5,
  showLogo:     false,

  // Generic, no assumed keys — real indexes are configured per-site (see config.yaml).
  browse: {
    years:   true,
    indexes: [],
  },
}