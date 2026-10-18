# Isang Daang Daan (IDD)

A responsive, client-side commuting community prototype. All accounts, routes, questions, and interactions are simulated in browser storage.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`. The static build can be deployed to Vercel or Netlify; SPA rewrite files are included.

## Adding images

Drop route photos into `src/assets/images/routes/` using the route id, for example `r1.jpg`. To replace the login screen's jeepney illustration with a photo, add `src/assets/images/illustrations/login.jpg`. Vite discovers JPG, JPEG, PNG, WebP, and AVIF files automatically. The login photo is cropped to fill its panel. Commit and redeploy to make new images available on the hosted site.
