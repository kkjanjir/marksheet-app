# marksheet-app

Simple static marksheet generator web app.

## Direct answer to your question

- **GitHub repo banane se app automatically live nahi hota.**
- App ko live link dene ke liye deployment chahiye.
- Is repo me GitHub Pages auto-deploy workflow add kar diya gaya hai.

## Get your public app link (easy)

1. Apni default branch ka naam `main` rakho.
2. Saare latest commits GitHub pe push karo.
3. GitHub me jao: **Settings → Pages**
4. Source: **GitHub Actions** select karo.
5. 1-2 min wait karo, fir link milega:
   - `https://<your-username>.github.io/<repo-name>/`

## Local run (if needed)

```bash
cd /workspace/marksheet-app
bash scripts/start-local.sh
```

Then open:

- `http://localhost:4173/index.html`

Login password:

- `sbs2025`

## Open on your Android phone (same Wi‑Fi)

1. Start server with `bash scripts/start-local.sh`
2. In another terminal, run:

```bash
hostname -I
```

3. Pick your PC IP (example `192.168.1.12`) and open on phone:

- `http://192.168.1.12:4173/index.html`
