# Srijan Kundu Chowdhury — Portfolio

A production-ready, modern, highly interactive personal portfolio built with **React + Vite + Framer Motion**.

## ✨ Features

- 🎨 Dark cyberpunk aesthetic with custom CSS variables
- 🖱️ Custom animated cursor with ring tracking
- 🌟 Particle canvas animation on Hero section
- 📜 Smooth scroll progress indicator
- 🎭 Framer Motion page & element animations
- ⌨️ Typewriter effect for role titles
- 📱 Fully responsive (mobile/tablet/desktop)
- 🌊 Marquee skill strip animation
- 💡 Card spotlight hover effect (mouse-tracked radial glow)
- 📬 Contact form (opens mailto)
- 🏆 Competitive programming stats section
- 🎯 Tabbed experience section
- 🔐 Noise overlay texture for depth

---

## 📁 File Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx          # Custom animated cursor
│   │   ├── Navbar.jsx          # Sticky nav with mobile menu
│   │   └── ScrollProgress.jsx  # Scroll progress bar
│   ├── sections/
│   │   ├── Hero.jsx            # Hero + particle canvas + stats bar
│   │   ├── About.jsx           # Bio + education cards
│   │   ├── Experience.jsx      # Tabbed work experience
│   │   ├── Projects.jsx        # Featured + other projects grid
│   │   ├── Skills.jsx          # Skill category cards + marquee
│   │   ├── Competitive.jsx     # CP platforms + achievements
│   │   └── Contact.jsx         # Contact form + social links
│   ├── styles/
│   │   └── global.css          # CSS variables, resets, utilities
│   ├── data.js                 # All portfolio content (single source of truth)
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag & drop the `dist/` folder to netlify.com/drop
```

### Deploy to GitHub Pages

```bash
# In vite.config.js, add: base: '/your-repo-name/'
npm run build
# Push dist/ to gh-pages branch
```

---

## ✏️ Customization

All content lives in **`src/data.js`** — update your name, bio, links, experience, projects, skills, and achievements there.

To update social links, replace the `#` placeholders in `data.js`:
```js
links: {
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  linktree: "https://linktr.ee/your-handle"
}
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Framer Motion | Animations |
| react-type-animation | Typewriter effect |
| react-scroll | Smooth scroll nav |
| react-icons | Icon library |
| react-intersection-observer | Scroll-triggered animations |

---

## 📄 License

MIT — feel free to use and adapt.
