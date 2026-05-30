# Abhijeet Raj — Personal Portfolio

> A personal portfolio built with editorial design principles, GSAP scroll animations, and a custom design system.

[![Live Demo](https://img.shields.io/badge/Live-Demo-0F1115?style=for-the-badge&logo=vercel)](https://abhijeetraj.dev)
[![GitHub](https://img.shields.io/badge/GitHub-abhijeetraj01-181717?style=for-the-badge&logo=github)](https://github.com/abhijeetraj01)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-abhijeetraj07-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/abhijeetraj07)

---

## Overview

A single-page portfolio site for **Abhijeet Raj** — CS student and software developer. Built entirely from scratch with vanilla HTML, CSS, and JavaScript, it emphasises precision in spacing, typography, and motion. Every easing curve and typographic detail is deliberate.

---

## ✨ Features

- **Scroll-driven animations** powered by [GSAP](https://gsap.com/) + ScrollTrigger
- **Custom design system** — design tokens, a consistent type scale, and a utility-first component layer
- **Fully accessible** — skip links, ARIA roles, semantic HTML, keyboard navigation, and screen-reader support
- **Responsive layout** — fluid grid that adapts from mobile to wide-screen
- **Mobile navigation overlay** — full-screen drawer with smooth open/close transitions
- **SEO-ready** — Open Graph tags, Twitter card, JSON-LD Person schema, and a descriptive meta description
- **Progressive enhancement** — a `no-js` class swap ensures content is readable without JavaScript
- **Resume download** — direct PDF download from both the hero CTA and the Resume section

---

## 🗂️ Project Structure

```
personal-portfolio/
├── index.html              # Single-page entry point
├── assets/
│   ├── portrait.png        # Profile photo
│   └── Resume.pdf          # Downloadable resume
├── css/
│   ├── main.css            # Root stylesheet (imports all partials)
│   ├── tokens.css          # Design tokens (colors, spacing, type scale)
│   ├── reset.css           # CSS reset / base
│   ├── components.css      # Shared components (buttons, tags, skill pills…)
│   ├── navbar.css          # Navigation bar & mobile overlay
│   ├── hero.css            # Hero section
│   ├── about.css           # About section & portrait
│   ├── timeline.css        # Timeline component (experience & education)
│   ├── projects.css        # Project cards & featured project
│   ├── resume.css          # Resume section
│   └── footer.css          # Footer CTA & footer bar
└── js/
    ├── main.js             # App bootstrap & shared utilities
    ├── navbar.js           # Hamburger toggle, scroll-spy, overlay logic
    ├── animations.js       # GSAP entrance animations & ScrollTrigger setup
    └── projects.js         # Project card interactions
```

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Markup      | HTML5 (semantic)                    |
| Styling     | Vanilla CSS (custom design system)  |
| Animation   | GSAP 3.12 + ScrollTrigger           |
| Typography  | EB Garamond (display) · Inter (UI)  |
| Fonts       | Google Fonts                        |
| Hosting     | *(GitHub Pages / Vercel)*           |

---

## 🚀 Getting Started

No build step required — it's plain HTML/CSS/JS.

### Run locally

```bash
# Clone the repository
git clone https://github.com/Abhijeetraj01/Personal-Portfolio.git

# Navigate into the project
cd Personal-Portfolio

# Open in browser (double-click index.html, or use a local server)
# With VS Code Live Server:
#   Right-click index.html → "Open with Live Server"

# Or with npx serve:
npx serve .
```

---

## 📄 Sections

| # | Section   | Description                                              |
|---|-----------|----------------------------------------------------------|
| 01 | **Hero**   | Headline, tagline, CTA buttons, and a scroll indicator  |
| 02 | **About**  | Bio, philosophy, skill pills, portrait, and experience timeline |
| 03 | **Projects** | Featured project card + a 4-card project grid         |
| 04 | **Resume** | Experience timeline, education, core skills, achievements, and PDF download |
| — | **Footer** | Contact CTA, email address, availability badge, socials |

---

## 🔗 Connect

| Platform | Link |
|----------|------|
| Email | [abhijeetraj100602@gmail.com](mailto:abhijeetraj100602@gmail.com) |
| GitHub | [github.com/abhijeetraj01](https://github.com/abhijeetraj01) |
| LinkedIn | [linkedin.com/in/abhijeetraj07](https://linkedin.com/in/abhijeetraj07) |

---

<p align="center">
  <sub>Designed with intention. Built with precision. © 2025 Abhijeet Raj</sub>
</p>
