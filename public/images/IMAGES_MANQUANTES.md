# Images manquantes — kendamoto.cl

> Ce fichier documente toutes les images à obtenir manuellement.
> Le site Kenda (kendatire.com) est une SPA Angular : les images ne sont pas accessibles via curl.
> Contacter marketing@kendatire.com ou télécharger manuellement depuis le back-office distributeur.

---

## Images produits (`public/images/products/`)

Format : WebP, optimisé avec `sharp`. Nommage strict : `{ref}-{variant}.webp`

### Variantes par produit

| Variante | Fichier | Description |
|---|---|---|
| `principal` | `k784-principal.webp` | Vue de côté / 3/4 produit — ratio 4:3, 600×450 min |
| `tread` | `k784-tread.webp` | Vue dessus gomme (sculpture) — ratio 4:3 |
| `flanco` | `k784-flanco.webp` | Vue de flanco (marquage) — ratio 4:3 |

### K784 Big Block — Trail Adventure

Dossier : `public/images/products/k784/`

- [ ] `k784-principal.webp`
- [ ] `k784-tread.webp`
- [ ] `k784-flanco.webp`

Sources : https://www.kendatire.com/en/tires/motorcycle/k784-big-block/

### K778 Knarly — Enduro (avant)

Dossier : `public/images/products/k778/`

- [ ] `k778-principal.webp`
- [ ] `k778-tread.webp`
- [ ] `k778-flanco.webp`

Sources : https://www.kendatire.com/en/tires/motorcycle/k778-knarly/

### K779 Knarly — Enduro (arrière)

Dossier : `public/images/products/k779/`

- [ ] `k779-principal.webp`
- [ ] `k779-tread.webp`
- [ ] `k779-flanco.webp`

Sources : https://www.kendatire.com/en/tires/motorcycle/k779-knarly/

### K785 Millville II — Cross / Motocross

Dossier : `public/images/products/k785/`

- [ ] `k785-principal.webp`
- [ ] `k785-tread.webp`
- [ ] `k785-flanco.webp`

Sources : https://www.kendatire.com/en/tires/motorcycle/k785-millville-ii/

### K782 Sand Mad — Cross / Motocross

Dossier : `public/images/products/k782/`

- [ ] `k782-principal.webp`
- [ ] `k782-tread.webp`
- [ ] `k782-flanco.webp`

Sources : https://www.kendatire.com/en/tires/motorcycle/k782-sand-mad/

### K761 Dual Sport — Dual Sport

Dossier : `public/images/products/k761/`

- [ ] `k761-principal.webp`
- [ ] `k761-tread.webp`
- [ ] `k761-flanco.webp`

Sources : https://www.kendatire.com/en/tires/motorcycle/k761/

### K787 Equilibrium — Calle / Carretera

Dossier : `public/images/products/k787/`

- [ ] `k787-principal.webp`
- [ ] `k787-tread.webp`
- [ ] `k787-flanco.webp`

Sources : https://www.kendatire.com/en/tires/motorcycle/k787-equilibrium/

---

## Images catégories (`public/images/categories/`)

Format : WebP, 1200×400 min, ratio ~3:1 (hero banner). Nommage : `{slug}.webp`

- [ ] `trail-adventure.webp` — moto trail en montagne / piste mixte
- [ ] `enduro.webp` — moto enduro en forêt / terrain
- [ ] `cross-motocross.webp` — moto cross en circuit / saut
- [ ] `dual-sport.webp` — moto dual-sport route + chemin
- [ ] `calle-carretera.webp` — moto sur route / autoroute Chili

---

## Images marque (`public/images/brand/`)

- [ ] `kenda-logo.png` — logo officiel Kenda Tires® (fond transparent, 200×80 px min)
- [ ] `bodega-zofri-iquique.webp` — photo bodega Carioca Chile Ltda. à ZOFRI Iquique (800×500)
- [ ] `kenda-stock-cajas.webp` — photo stock neumáticos Kenda en cajas (800×500)

---

## Procédure d'optimisation WebP

Une fois les images obtenues (JPG/PNG), optimiser avec sharp :

```bash
cd public/images
npx sharp-cli --input products/k784/k784-principal.jpg \
  --output products/k784/k784-principal.webp \
  --format webp --quality 82 --width 600
```

Puis générer les blur placeholders dans `src/data/image-blur-map.ts` :

```bash
node scripts/generate-blur-map.js
```

(créer ce script si nécessaire — il lit `public/images/products/**/*.webp` et génère des base64 10×10 px)

---

## Notes

- Le CDN Kenda (`cdn.kendatire.com`) est configuré dans `next.config.ts` mais les URLs exactes nécessitent les IDs media internes (non exposés publiquement).
- En attendant les images, les composants `ProductImage`, `CategoryHeroImage`, et `ProductCard` affichent un fallback stylisé (fond sombre + ref en rouge).
- Contacter : **marketing@kendatire.com** avec l'objet "Distribuidor Chile — Solicitud kit imágenes productos"
