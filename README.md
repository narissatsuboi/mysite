# narissatsuboi.github.io/mysite

My personal site: blog posts, talks, and an About page. Built with Astro on the
Patrika theme and deployed to GitHub Pages.

Live at **https://narissatsuboi.github.io/mysite/**

## Run it locally

```sh
npm install
npm run dev
```

Open http://localhost:4321/mysite/ (note the `/mysite/` part; the root URL is a 404).
The dev server reloads as you edit. It also shows drafts, so check the live site
before assuming something is published.

## Add a blog post

1. Create `src/content/posts/my-post-slug.md`. The filename becomes the URL:
   `/blog/my-post-slug`.
2. Start it with this front matter:

   ```yaml
   ---
   title: My post title
   description: One sentence shown in the post list and link previews.
   published: 2026-11-09
   category: Kafka          # shown above the title; shows "Post" if left out
   tags: [kafka, postgres]  # each tag gets a page at /tags/<tag>
   cover: posts/attachments/my-cover.jpg   # optional
   # draft: true            # hides the post on the live site
   ---
   ```

3. Put images in `src/content/posts/attachments/`. In the body, refer to them
   by filename: `![Alt text](my-diagram.png)`. Consecutive images on their own
   lines become a gallery with a lightbox.

Optional fields: `updated`, `featured: true`, and `series` plus `seriesOrder` to
link posts in a series.

## Add a talk

1. Create `src/content/talks/my-talk-slug.md` (URL: `/talks/my-talk-slug`).
2. Put photos in `src/content/talks/photos/` and the slides PDF in `public/slides/`.
3. Front matter (only `title`, `description`, `date`, and `event` are required):

   ```yaml
   ---
   title: "Talk title"
   description: One sentence about the talk.
   date: 2026-12-03
   event: Seattle Postgres
   eventUrl: https://www.meetup.com/seattle-postgres/
   location: Seattle, WA
   rsvpUrl: https://...         # shown while the talk is upcoming
   slidesPdf: /slides/my-talk.pdf
   video: https://...
   cover: ./photos/my-talk-cover.jpg
   coverFit: contain            # use for slides or diagrams so they aren't cropped
   photos:
     - image: ./photos/my-talk-cover.jpg
       alt: What the photo shows
       caption: Optional caption
   repos:
     - title: demo-repo
       url: https://github.com/narissatsuboi/demo-repo
       description: What the demo does
   thanks:
     - name: Organizer Name
       role: Organizer
       url: https://...
       note: Thanks for having me!
   related:
     - title: A useful link
       url: https://...
       note: Optional note
   # draft: true
   ---
   ```

4. Write what the talk covered and how it went in the body.

A talk dated today or later shows under **Upcoming**. Once its date passes it
moves to **Past talks**. The site rebuilds every morning so this happens on
its own.

The photo used as `cover` shows at the top of the talk page. The rest show in
the Photos section. On the page, sections run in this order: Demo code,
Thank you, Photos, Slides, Related.

## Other things I might edit

- **About page:** `src/content/pages/about.md`, with images in
  `src/content/pages/attachments/`.
- **Meetups list** on the Talks page: `src/meetups.ts`.
- **Nav, footer links, social links, site title and bio:**
  `src/content/siteConfig/config.yaml`.

## Writing tips

- Obsidian-style `==highlights==`, `%%hidden comments%%`, and `:::aside` blocks
  work.
- Don't use `[[wikilinks]]` to link between pages. They point to `/notes/...`
  pages that don't exist on this site.
- Don't start links in the body with `/` (for example `/talks`). The site lives
  under `/mysite/`, so those links break. Use full URLs
  (`https://narissatsuboi.github.io/mysite/talks/`) instead. Front matter paths
  like `slidesPdf` and `cover` are handled for you.

## Publish

Commit and push to `main`. GitHub Actions builds and deploys in about a minute.
Check progress with `gh run list` or on the repo's Actions tab. The live site
can stay cached in your browser for up to 10 minutes, so hard refresh
(Cmd+Shift+R) if a change doesn't show.

To check a production build locally first (drafts hidden), run
`npm run build && npm run preview`.

## Moving to narissatsuboi.com

Once I own the domain:

1. Add `public/CNAME` containing `narissatsuboi.com`.
2. In `.github/workflows/deploy.yml`, set `SITE: https://narissatsuboi.com` and
   `BASE: /`. Make the same change to the defaults in `astro.config.mjs`.
3. Set `url` in `src/content/siteConfig/config.yaml` to `https://narissatsuboi.com`.
4. Add GitHub Pages' DNS records at the registrar and set the custom domain in
   the repo's Settings, then Pages.

## Commands

| Command           | What it does                                                 |
| :---------------- | :----------------------------------------------------------- |
| `npm install`     | Install dependencies                                         |
| `npm run dev`     | Dev server at `localhost:4321/mysite/` (shows drafts)        |
| `npm run build`   | Build to `dist/` and build the search index                  |
| `npm run preview` | Serve the production build locally                           |
