# NewsApp (Angular) — Plataforma Web de Noticias

Entrega final del módulo de Desarrollo de Front-end. Evolución del prototipo
HTML/CSS/JS (Entrega 2) a una aplicación Angular con componentes y binding.

Repositorio: https://github.com/darkcatxx/frontend2026
Aplicación: https://darkcatxx.github.io/frontend2026/

## Requisitos
- Node.js 20.19 o superior (recomendado 22) y npm.

## Ejecutar en local
```bash
npm install
npm start          # abre http://localhost:4200
```

## Compilar
```bash
npm run build      # genera dist/newsapp/browser
```

## Estructura
```
src/app/
├── models/noticia.model.ts          Interfaz Noticia
├── services/
│   ├── noticias.service.ts          HttpClient + localStorage + signals (mini CRUD)
│   └── favoritos.service.ts         Favoritos en localStorage
├── components/                      Header, Footer, NoticiaCard (reutilizable)
├── pages/                           Home, Noticias, Detalle, Favoritos, Nosotros, Contacto
├── app.routes.ts                    Rutas (hash routing)
└── app.config.ts                    Providers (router, http, locale es)
public/noticias.json                 Fuente de datos local
```

## Despliegue en GitHub Pages (automático)
1. Sube el proyecto a un repositorio de GitHub (rama `main`).
2. En el repositorio: **Settings > Pages > Source: GitHub Actions**.
3. Cada `git push` a `main` compila y publica el sitio en
   `https://darkcatxx.github.io/frontend2026/`.

## Despliegue alternativo (Netlify / Vercel)
- Build command: `npm run build`
- Publish / output directory: `dist/newsapp/browser`
- Si lo despliegas en la raíz del dominio, no necesitas `--base-href`.
