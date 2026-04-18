# Rimal — Desert artisan storefront

A single-page **e-commerce style** demo for a desert-themed artisan brand (**Rimal**). Built with **React** and **Vite**, styled with **Tailwind CSS**, with **English / Arabic** UI including **RTL** layout, a persisted shopping cart, and client-side routing.

## Features

- **Pages**: Home, products catalog with filters & search, product details, cart, about, contact  
- **Internationalization**: English and Arabic strings; `dir` / `lang` on `<html>` switch with locale  
- **RTL**: Arabic layout flows right-to-left where appropriate  
- **State**: Zustand stores for theme, language, and cart (cart persisted in the browser)  
- **UI**: Responsive layout, dark mode, accessible controls (labels, alt text)  
- **Data-driven products**: Catalog lives in `src/data/products.js` (easy to extend)

## Tech stack

| Area        | Choice                          |
|------------|----------------------------------|
| Framework  | React 19                         |
| Build      | Vite 5                           |
| Routing    | React Router 7                   |
| Styling    | Tailwind CSS 3, PostCSS          |
| State      | Zustand 5                        |
| Linting    | ESLint 9 (flat config)           |

## Prerequisites

- **Node.js** 18+ (20+ recommended)  
- **npm** (comes with Node)

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/TadresRadi/Ramal-for-desert-style-and-products.git
cd Ramal-for-desert-style-and-products
npm install
```

### Scripts

| Command        | Description                |
|----------------|----------------------------|
| `npm run dev`  | Start dev server (Vite)    |
| `npm run build`| Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint                 |

Development server defaults to **http://localhost:5173** (Vite).

## Project layout (high level)

```text
src/
  components/     # Layout, home sections, UI pieces
  pages/          # Route-level screens
  store/          # Zustand stores (lang, theme, cart)
  i18n/           # en.js / ar.js translation objects
  data/           # products, testimonials, reviews
public/
  images/         # Static imagery for products & hero
```

## Customization

- **Products & copy**: Edit `src/data/products.js` and `src/i18n/en.js` / `src/i18n/ar.js`.  
- **Theme / colors**: `tailwind.config.js` and `src/index.css`.  
- **Routes**: `src/App.jsx`.

## License

This project is provided as a **demo / portfolio** starter. Add a license file if you redistribute or fork publicly.

---

**Repository:** [github.com/TadresRadi/Ramal-for-desert-style-and-products](https://github.com/TadresRadi/Ramal-for-desert-style-and-products)
