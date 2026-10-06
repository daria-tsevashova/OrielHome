# Oriel Homes

![Oriel Homes Preview](./public/preview.png) 
> A portfolio project: static real-estate landing page for renting, buying and investing in homes across Poland.

**Live Demo:** https://oriel-home.netlify.app

## Overview

Oriel is a portfolio project: a lightweight single-page real-estate landing page designed around a premium editorial layout and a clear local-market narrative. The site presents seven Polish cities, a property carousel, journal-style content, a privacy flow and a lead form.

The project is built as a plain HTML, CSS and JavaScript website, with all logic kept in the browser rather than in a framework.

## Features

* city-based property discovery and search filters
* rent and buy modes with a currency selector
* responsive hero, city panels and property card carousel
* scroll-linked motion, parallax and reveal animations
* journal guides and modal popups
* privacy policy and cookie consent flow
* client testimonials carousel
* contact form with a placeholder webhook flow for lead submission

## Tech Stack

| Layer | Used for |
| --- | --- |
| HTML | page structure and content |
| CSS | layout, styling, responsiveness and motion |
| JavaScript | rendering, filters, forms, modals and scroll interactions |
| Google Fonts | Geologica typeface |
| Cloudinary | property and editorial imagery |
| Browser APIs | IntersectionObserver, localStorage, dialog, requestAnimationFrame |

## Design Direction

The visual direction combines a premium real-estate aesthetic with a clean editorial layout.

The interface is shaped around:

* typography and hierarchy
* generous spacing
* neutral, natural palette choices
* high-quality property imagery
* subtle UI transitions and motion
* clear calls to action
* responsive layouts for desktop and mobile

## AI-Assisted Development

AI tools were used during the workflow for exploration, implementation support and iteration.

They were helpful for:

* generating and refining design and UX ideas
* supporting the build of layout and interaction patterns
* reviewing HTML, CSS and JavaScript structure
* speeding up repetitive front-end tasks

The final decisions, content and implementation were checked and refined as part of the project work.

## Project Structure

```text
.
├── assets/
│   ├── apple-touch-icon.png   # iOS home screen icon
│   └── og-image.jpg           # social preview image
├── css/
│   └── style.css              # all site styles
├── favicon-16.png             # favicon variation
├── favicon-32.png             # favicon variation
├── favicon.ico               # browser favicon
├── index.html                 # landing page markup
├── js/
│   ├── data.js                # photo, listing, city, guide and testimonial data
│   ├── main.js                # rendering logic, filters, forms and dialogs
│   └── scroll.js              # hero scrub, parallax and scroll-linked motion
├── public/
│   └── preview.png            # project preview image
├── README.md                 # project documentation
└── .DS_Store                 # local macOS metadata
```

## Configuration

* `index.html` contains the Open Graph placeholders for `og:image` and `og:url` in the head section, and the GA4 / Meta Pixel placeholders remain as comments to be filled in before deployment.
* `js/main.js` contains `const LEAD_WEBHOOK_URL = ''; // TODO: paste your Google Apps Script Web App URL here` for the contact form webhook.
* `assets/apple-touch-icon.png` and `assets/og-image.jpg` are the local asset files used for the touch icon and social preview placeholders.

## Getting Started

### Prerequisites

* a local browser
* Python 3 (optional, for a simple local static server)

### Installation

```bash
git clone <repository-url>
cd oriel-home
```

### Run locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

This project is a static front-end and can be deployed to any host that serves HTML, CSS and JavaScript files. Update the OG metadata and analytics placeholders before publishing.

## Project Status

This is a portfolio project created to demonstrate front-end development, motion design and practical UI implementation for a real-estate brand.

All company information, listings and contact details shown on the site are fictional.

---

### Author

**Daria**

Front-end developer focused on polished, responsive and user-centred web experiences.

[GitHub](https://github.com/daria-tsevashova)
