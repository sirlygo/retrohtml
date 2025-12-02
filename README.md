# RetroBat Anywhere

A single-page site that lets you point a browser at your own RetroBat streaming endpoint so you can play your personal collection from anywhere. It stores the URL locally, includes a host-prep checklist, and never distributes ROMs/BIOS files.

## Usage
1. Host RetroBat on your PC and enable a streamer like Sunshine/Moonlight, Parsec, or Steam Remote Play.
2. Secure the connection (VPN, reverse proxy, or SSH tunnel) and copy the HTTPS/WSS stream URL.
3. Open `index.html` in your browser, paste the URL, and click **Launch session**. The page remembers your last endpoint.
4. Add your full RetroBat folder path so the page always points at your install when you bundle setup details.

You can also prefill the page with `?session=` in the URL, e.g.: `index.html?session=https://my-host.example/stream`.

Want everything about your rig in one place? Use the **Bundle your rig** section to store your RetroBat install path, BIOS/ROM locations, versions, and notes. It saves locally and can be exported as JSON for another device.

## Notes
- Checklist progress is stored in `localStorage` for convenience.
- The page never uploads endpoints or content; everything stays in your browser.
- Keep your library legal—dump your own cartridges and discs.
