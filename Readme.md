# WellPack

WellPack is a modern corporate landing page for a packaging and industrial solutions brand. The project is built with Next.js and designed to showcase a professional, polished presentation for product marketing, lead generation, and brand credibility.

## Overview

This repository contains the front-end application for WellPack Industries, focusing on:

- a premium hero section
- responsive navigation for desktop and mobile
- clean product-focused branding
- smooth GSAP motion effects
- strong call-to-action sections for customer inquiries

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- GSAP

## Project Structure

```bash
WellPack/
├── front-end/
│   ├── public/
│   │   ├── images/
│   │   └── logos/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── components/
│   │       ├── home/
│   │       │   └── hero.tsx
│   │       └── navbar/
│   │           └── navbar.tsx
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   └── README.md
├── Readme.md
└── ...
```

## Getting Started

1. Open the frontend app folder:

```bash
cd front-end
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the app locally:

```bash
pnpm dev
```

4. Open the browser at:

```bash
http://localhost:3000
```

## Available Scripts

From the `front-end` directory, use:

```bash
pnpm dev
```
Runs the development server.

```bash
pnpm build
```
Creates a production build.

```bash
pnpm start
```
Starts the production build.

```bash
pnpm lint
```
Runs ESLint checks.

## Features

- Responsive design for mobile and desktop screens
- Sticky header navigation with mobile menu
- Animated hero content with GSAP text splitting
- Attractive packaging-themed imagery and layered visuals
- Clear brand styling with warm industrial colors
- CTA-driven layout for quote requests and lead generation

## Branding and Assets

Custom brand images and logos are stored in the public folder for the landing page visuals and site branding.

## Notes

This is a front-end marketing website for a packaging business and is structured to be extended with additional sections such as products, about, services, client testimonials, and contact details.

## License

This project is intended for project or business use unless otherwise specified by the owner.
