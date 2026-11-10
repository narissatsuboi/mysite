export type SocialIcon = 'github' | 'linkedin' | 'mastodon' | 'twitter' | 'rss' | 'email' | 'instagram' | 'youtube'

export interface NavItem {
  title: string
  url:   string
}

export interface SocialItem {
  title: string
  url:   string
  icon?: SocialIcon
}

export interface UserConfig {
  // site identity
  title:       string
  description: string
  url:         string

  // author
  author: {
    name:    string
    url?:    string
  }

  // navigation
  navigation?:  NavItem[]
  footerLinks?: NavItem[]
  social?:      SocialItem[]

  // content display
  tagline?:        string
}