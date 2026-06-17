# image-metadata-viewer

A browser-based MVP tool for inspecting common image metadata locally.

## Features

- Upload via drag-and-drop or file picker
- Shows filename, size, dimensions, and MIME type
- Parses EXIF-like embedded metadata (when present)
- Exports all captured metadata as a JSON file

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## CI/CD

Pushes to `main` deploy `dist/` to Cloudflare Pages via GitHub Actions (`.github/workflows/deploy.yml`). You can also run the workflow manually from the Actions tab.

Required secrets: org-level `CF_API_TOKEN` and `CF_ACCOUNT_ID`, plus repo-level `CF_PAGES_IMAGE_METADATA_VIEWER`.

## Notes

- Metadata parsing is fully local in-browser.
- Images without embedded EXIF data still show basic file metadata.
