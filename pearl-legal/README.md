# Pearl Investment Corporation
## International Legal Services — Website

---

### Estructura del proyecto

```
pearl-legal/
│
├── index.html              ← Página principal
│
├── css/
│   ├── variables.css       ← Design tokens (colores, fuentes, espaciado)
│   ├── base.css            ← Reset + estilos base
│   ├── animations.css      ← Keyframes + clases de animación
│   ├── components.css      ← Componentes UI (nav, botones, cards, modal, etc.)
│   └── layout.css          ← Secciones de página (hero, features, etc.)
│
├── js/
│   └── main.js             ← Toda la lógica: nav, scroll, modal, counters, reveal
│
└── assets/
    ├── symbol.svg          ← Ícono Pearl (solo símbolo)
    ├── logo-horizontal.svg ← Logo horizontal para nav/footer
    └── logo-full.svg       ← Logo completo con fondo
```

---

### Sistema de diseño

| Token        | Valor         | Uso                          |
|--------------|---------------|------------------------------|
| `--gold`     | `#C8A96E`     | Acentos, CTAs, highlights    |
| `--black`    | `#080808`     | Fondo principal              |
| `--charcoal` | `#161616`     | Fondos de secciones          |
| `--pearl`    | `#F4F1EB`     | Texto principal              |
| `--navy`     | `#0A1628`     | Sección CTA                  |

**Tipografías:**
- Display/Headings: `Cormorant Garamond` (Google Fonts)
- Body: `EB Garamond` (Google Fonts)
- UI/Labels: `Cinzel` (Google Fonts)

---

### Características implementadas

- ✅ Navbar sticky con scroll effect + mobile hamburger
- ✅ Hero con grilla animada, orbs y emblema flotante
- ✅ Barra de estadísticas con counter animation (IntersectionObserver)
- ✅ Scroll reveal en todos los elementos
- ✅ Cards con hover lift y decorador de línea dorada
- ✅ Proceso de 3 pasos con números grandes
- ✅ Sección About con animación orbital del logo
- ✅ Modal de contacto con formulario completo
- ✅ Floating CTA button
- ✅ Footer con grid de 3 columnas
- ✅ CSS modular por responsabilidad
- ✅ Accesibilidad: roles ARIA, labels, skip-nav
- ✅ Responsive: 1280px / 1024px / 768px / 480px

---

### Para producción

1. Minificar CSS y JS (`cssnano`, `terser`)
2. Convertir imágenes a WebP
3. Añadir `<link rel="icon">` con el símbolo PNG
4. Configurar endpoint real en el formulario (reemplazar `setTimeout` en `main.js`)
5. Añadir Google Analytics / Tag Manager si aplica

---

*Pearl Investment Corporation · Austin, TX · ID: 0110710400*
