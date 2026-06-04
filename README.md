# 侍 ronin — personal security blog

A minimal **anime-samurai** themed blog for offensive-security content: Hack The
Box / machine writeups, CTF challenge solutions, CVE research, and field
cheatsheets. Built with [Astro](https://astro.build), dark crimson-katana theme,
self-hosted fonts, and built-in Shiki syntax highlighting.

## Stack

- **Astro 5** (static, ships zero JS by default)
- Content collections: `htb`, `ctf`, `cve`, `notes` (typed frontmatter)
- `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`
- Vanilla CSS design tokens — tune the whole palette in `src/styles/global.css`

> **Node requirement:** This repo is pinned to Astro 5 because Astro 6 needs
> Node ≥ 22.12. To move to Astro 6 later, upgrade Node first (e.g. `nvm install 22`),
> then `npm install astro@latest @astrojs/mdx@latest @astrojs/check@latest`.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve the production build
npm run check      # type + content-schema validation
```

## Make it yours

1. **Identity:** edit `src/consts.ts` — `SITE.name`, `handle`, `tagline`,
   `kanji`, and your `socials` (empty string `''` hides a link).
2. **whoami:** edit `src/pages/about.astro`.
3. **Colors / fonts:** the `:root` tokens at the top of `src/styles/global.css`.
4. **Favicon / logo:** `public/favicon.svg` and the inline SVG in
   `src/components/Header.astro`.

## Writing posts

Drop a Markdown (`.md`) or MDX (`.mdx`) file into the matching folder. The
frontmatter schema is enforced by `src/content.config.ts` (run `npm run check`).
The sample post in each folder doubles as a template — copy it.

| Section | Folder | Required frontmatter |
| --- | --- | --- |
| Writeups | `src/content/htb/` | `title, pubDate, machine, difficulty` |
| CTF | `src/content/ctf/` | `title, pubDate, event, category` |
| CVE | `src/content/cve/` | `title, pubDate, cveId, cvss, severity, affectedProduct, vulnType` |
| Notes | `src/content/notes/` | `title, pubDate` |

Set `draft: true` to keep a post out of production builds (it still shows in `dev`).

In `.mdx` posts you can use callouts:

```mdx
import Callout from '../../components/Callout.astro';

<Callout type="exploit" title="PoC">command here</Callout>
```

`type` is one of `info | warning | danger | exploit`.

## Deploy to GitHub Pages

1. **Set the URL** in `astro.config.mjs`:
   - User/Org site (repo named `<user>.github.io`): `site: 'https://<user>.github.io'`, `base: '/'`
   - Project site (any other repo name): `site: 'https://<user>.github.io'`, `base: '/<repo-name>/'`
   - Also update the `Sitemap:` line in `public/robots.txt`.
2. Push to the `main` branch on GitHub.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on
   every push to `main`. Watch it under the **Actions** tab.

**Custom domain:** add a `public/CNAME` file containing your domain and set
`site` to `https://yourdomain.com`, `base: '/'`.

## License

Content © you. Do what you like with the theme code.
