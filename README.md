# 🛡️ VERITAS // НАЦИОНАЛНА ПЛАТФОРМА ЗА ГРАЖДАНСКИ ОДИТ
*Свободен публичен регистър съгласно чл. 41 от Конституцията на Република България.*

## 📌 Архитектура & Технологичен Стек
- **Framework:** Next.js 16 (Turbopack, Static Export)
- **UI & Типография:** React 19, Vanilla CSS Custom Properties, Google Inter & Serif
- **Географски Модули:** Leaflet, React-Leaflet, CartoDB Voyager Tiles, Topo/GeoJSON Contours
- **Одитни Визуализации:** Chart.js, React-Chartjs-2, Mermaid.js (Dynamic Pan/Zoom & Modal Intelligence)
- **Runtime Валидация & Търсене:** Zod, Fuse.js (Fuzzy Matching)
- **Сигурност:** DOMPurify SVG Sanitization, CSP Compliance
- **CI/CD:** GitHub Actions (Automated static export verification)

## 🚀 Бърз Старт (Local Setup)

```bash
# Инсталиране на зависимостите
npm install

# Стартиране на дев сървър
npm run dev

# Продукционен билд (Статичен Експорт за CDN/GitHub Pages)
npm run build
```

## 🗺️ Структура на Данните (Data Provenance)
Всички одитни досиета, разследвания и географски параметри преминават през строги Zod схеми в `src/lib/schemas.ts`:
- **Сметна палата на РБ:** Доклади за АПИ, МРРБ, НЗОК, ДКК и 28-те административни области.
- **АДФИ & ИСУН 2020:** Неправомерни възлагания, инхаус договори и анекси по ЗОП.
- **Търговски регистър & Държавен вестник:** Проследяване на крайни бенефициенти и подставени лица.
