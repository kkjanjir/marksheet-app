# marksheet-app

Simple static marksheet generator web app.

## Quick start (local)

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

## Stop server

Press `Ctrl + C` in the terminal where the server is running.
