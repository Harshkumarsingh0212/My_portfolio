# Harsh Kumar Singh — Portfolio

A personal portfolio site built with plain HTML, CSS and JavaScript (no build step, no dependencies).

## Structure

```
portfolio/
├── index.html      # Page content (hero, about, experience, projects, skills, achievements, contact)
├── style.css        # Dark theme styling, gradients, animations, responsive layout
├── script.js        # Scroll reveal, typing effect, counters, nav highlighting, mobile menu
└── assets/
    ├── profile.jpg                      # Profile photo
    └── Harsh_Kumar_Singh_Resume.pdf     # Downloadable resume (linked from the "Resume" nav button)
```

## Running locally

Just open `index.html` in a browser — no server required.

Or serve it locally:

```bash
python -m http.server 5500
```

then visit `http://localhost:5500`.

## Deploying

This is a static site, so it works as-is on GitHub Pages, Vercel, Netlify, etc.
For GitHub Pages: push this folder to a repo and enable Pages on the `main` branch (root).
