# RetroBat Anywhere

A friendly single-page helper for launching your RetroBat streaming endpoint from any browser. Point it at your own Sunshine/Moonlight, Parsec, or Steam Remote Play URL, keep a shareable bundle of your setup, and reconnect quickly on new devices without exposing your library.

## Highlights
- Remembers your last stream endpoint so you are a click away from playing again.
- Tracks a lightweight host-prep checklist with progress saved locally.
- Lets you describe your RetroBat install (paths, BIOS/ROM locations, versions, notes) and export it as JSON for another machine.
- Works fully client-side—no accounts, servers, or external dependencies required.

## What you need
- A modern browser with `localStorage` enabled.
- A working remote streaming URL from your host (Sunshine/Moonlight, Parsec, Steam Remote Play, or similar).
- (Recommended) A trusted VPN, reverse proxy, or SSH tunnel that exposes the stream over HTTPS/WSS.

## Quick start
1. **Get the files:** clone or download this repo anywhere you can open a browser.
2. **Serve locally (recommended):** run `python3 -m http.server 8000` from the project root, then visit `http://localhost:8000`. You can also double-click `index.html` to open it directly.
3. **Prep your host:** launch RetroBat, start your streamer, and confirm the endpoint works on your LAN.
4. **Secure access:** expose the stream through your VPN/proxy/tunnel so you have an HTTPS/WSS URL ready to paste.
5. **Launch a session:** enter the stream URL, click **Launch session**, and you are in. The page remembers the endpoint for next time.

## Host prep checklist
The on-page checklist tracks steps like starting RetroBat, enabling your streamer, and confirming controllers. Click items as you complete them; progress is stored locally so you can pick up where you left off on the same browser.

## Launching from a shared URL
You can prefill the page by adding `?session=<https-or-wss-url>` to the URL, for example:

```
index.html?session=https://my-host.example/stream
```

When a query parameter is present, it overrides the saved endpoint for that visit.

## Bundle your rig
Use the **Bundle your rig** panel to capture key details:
- **Install location, BIOS directory, ROM path, versions, notes**
- **RetroBat folder reference:** an optional folder path you can save separately so the UI always points to your files.

Click **Save bundle** to persist the details, **Clear bundle** to reset, and **Export bundle** to copy a JSON snapshot for another device. The exported JSON can be pasted into your browser devtools and written back to `localStorage` to prefill the page elsewhere.

## Where data lives
Everything stays on your device in `localStorage`:
- `retrobat-endpoint`: your most recent stream URL.
- `retrobat-steps`: checklist completion state.
- `retrobat-bundle`: bundle details (paths, versions, notes).
- `retrobat-folder`: the saved RetroBat install directory used to keep the bundle in sync.

Use your browser’s storage controls to clear these keys if you want a clean slate.

## Security notes
- Always use a network path you trust (VPN, reverse proxy, or SSH tunnel) before pasting a remote endpoint.
- Keep ROMs/BIOS private and legal—stick to content you own.
- Disable authorization for lost devices in your streaming tool as soon as possible.

## Troubleshooting
- **Status pill stays idle:** verify the stream URL works locally and that HTTPS/WSS is reachable from your device.
- **Controllers not detected:** confirm your streamer sees them on the host, then relaunch the session.
- **Clipboard export blocked:** some browsers restrict clipboard access; if so, manually copy the JSON shown after exporting.

Enjoy your retro sessions anywhere, with your own gear and no extra setup beyond the browser.
