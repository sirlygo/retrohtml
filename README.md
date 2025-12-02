# RetroBat Anywhere

A single-page site that lets you point a browser at your own RetroBat streaming endpoint so you can play your personal collection from anywhere. It stores the URL locally, includes a host-prep checklist, and never distributes ROMs/BIOS files.

## Quick start
1. **Clone or download** this repo anywhere you can run a browser.
2. **Serve the page locally (recommended):** from the project root run `python3 -m http.server 8000` and open http://localhost:8000 in your browser. You can also double-click `index.html` to open it directly if you prefer.
3. **Prepare your host PC:** launch RetroBat, start your preferred streamer (Sunshine/Moonlight, Parsec, Steam Remote Play), and confirm the stream URL works from inside your network.
4. **Secure the connection:** set up a VPN, reverse proxy, or SSH tunnel so you have an HTTPS/WSS endpoint you trust. Copy that URL.
5. **Launch a session:** paste the HTTPS/WSS stream URL into the page, click **Launch session**, and enjoy. The page remembers your last endpoint automatically.
6. **Bundle your rig (optional):** add your RetroBat install path plus BIOS/ROM locations, versions, and notes in the **Bundle your rig** section. It saves locally and can be exported as JSON to another device.

You can prefill the page with `?session=` in the URL, e.g.: `index.html?session=https://my-host.example/stream`.

Need a clean slate? Use your browser’s storage controls to clear localStorage for the page, then reload.

## Notes
- Checklist progress is stored in `localStorage` for convenience.
- The page never uploads endpoints or content; everything stays in your browser.
- Keep your library legal—dump your own cartridges and discs.
