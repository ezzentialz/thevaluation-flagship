# The Valuation & Consultants — Cinematic 3D Website

เว็บไซต์ใหม่ของ บริษัท เดอะแวลูเอชั่น แอนด์ คอนซัลแทนท์ส จำกัด
Cinematic 3D website built with Next.js 14 + React Three Fiber + Tailwind CSS

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **React Three Fiber** + **@react-three/drei** — 3D scenes
- **@react-three/postprocessing** — Bloom, Vignette, SMAA effects
- **Tailwind CSS** — styling
- **GSAP** (ready) — scroll-driven animations
- **i18n** — Thai / English language switcher

## Features

- 🎬 **Cinematic Hero** — 3D city skyline with procedural buildings, floating particles, light beams, star field, and video background
- 🏙️ **Procedural Buildings** — custom-generated skyscrapers, hotels, industrial, commercial, residential towers with emissive windows
- 🎥 **Video Background** — hero video (`/videos/hero-1.mp4`) mapped into the 3D scene
- ✨ **Post-processing** — Bloom, Vignette, SMAA anti-aliasing
- 📱 **Progressive Enhancement** — WebGL detection with image fallback for unsupported devices
- 🌐 **i18n** — Thai/English toggle (persisted in localStorage)
- 📄 **Full Pages** — Home, About, Services, Properties, Branches, Careers, Articles, Contact

## Getting Started

### Prerequisites

- Node.js 18+ and npm (installed via `winget install OpenJS.NodeJS.LTS`)

### Run (Windows — use the launcher scripts)

> **Note:** This project lives in a folder named `V&C`. The `&` character breaks
> `npm run` scripts on Windows (npm's `.cmd` shims split on `&`). Use the
> provided launchers, which call `node` directly:

```bat
start-dev.cmd    :: development server  -> http://localhost:3000
build.cmd        :: production build
start.cmd        :: production server   -> http://localhost:3000
```

Or run manually (from the project folder):

```bat
set "PATH=C:\Program Files\nodejs;%PATH%"
node "node_modules\next\dist\bin\next" dev
```

### Install dependencies (if needed)

```bat
set "PATH=C:\Program Files\nodejs;%PATH%"
npm install
npm install-scripts approve unrs-resolver
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Home (cinematic scroll experience)
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── properties/page.tsx
│   ├── branches/page.tsx
│   ├── careers/page.tsx
│   ├── articles/page.tsx
│   ├── contact/page.tsx
│   ├── loading.tsx         # 3D spinner loader
│   ├── error.tsx           # Error boundary
│   └── not-found.tsx       # 404 page
├── components/
│   ├── three/
│   │   ├── HeroScene.tsx        # Main 3D hero (city, particles, video, lights)
│   │   └── ProceduralBuildings.tsx  # Procedural building generator
│   ├── sections.tsx        # All page sections (Hero, About, Services, etc.)
│   ├── Navbar.tsx          # Fixed nav with glassmorphism
│   ├── Footer.tsx
│   └── PageShell.tsx       # Shared sub-page layout
├── context/I18nContext.tsx # Language provider
├── lib/
│   ├── translations.ts     # TH/EN content
│   └── utils.ts            # helpers (cn, lerp, easings)
└── types/index.ts          # TypeScript types
```

## Media Assets

- `public/videos/hero-1.mp4` — cinematic hero video (from `1.mp4`)
- `public/videos/hero-2.mp4` — alternate cinematic clip
- `public/images/hero-slide.jpg` — fallback hero image

## Customization

- **Colors**: edit `tailwind.config.js` → `theme.extend.colors.brand`
- **3D city**: edit `generateCityBuildings()` in `HeroScene.tsx`
- **Content**: edit `src/lib/translations.ts`
- **Video**: replace `public/videos/hero-1.mp4`

## Performance Notes

- Desktop-first 3D (per requirements)
- Dynamic import of HeroScene (`ssr: false`) to avoid hydration issues
- WebGL capability check with graceful image fallback
- `dpr={[1, 2]}`, `powerPreference: 'high-performance'`
- Reduced-motion media query respected in CSS
