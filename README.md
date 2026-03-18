# Resistance LLC Website

Static single-page website for [Resistance LLC](https://resistancellc.com), a technology company with three lines of business:

- **Technical and AI Advisory Practice**
- **Research and Development Services**
- **Entertainment Contracting**

## Tech Stack

HTML, CSS, and vanilla JavaScript — no frameworks or build step required.

## Structure

```
index.html          # Entry point
css/styles.css      # Styles
js/main.js          # Navbar, canvas animation, scroll reveals
img/                # Logo and favicon
robots.txt          # Search engine directives
sitemap.xml         # Sitemap for SEO
```

## Features

- Dark theme with animated particle network hero background (canvas)
- Collapsing navbar with logo on scroll
- Scroll-triggered reveal animations on the about section
- SEO meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- Responsive layout

## Development

Install dev dependencies:

```sh
npm install
```

Run all linters (HTML, CSS, JS):

```sh
npm run lint
```

Individual linters:

```sh
npm run lint:html   # HTMLHint + html-validate
npm run lint:css    # Stylelint
npm run lint:js     # ESLint
```

## CI

GitHub Actions runs `npm run lint` on every pull request targeting `main`.
