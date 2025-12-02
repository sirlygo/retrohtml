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

## ZeroTier setup (VPN-style access)
ZeroTier is a fast way to give your host PC and your remote device a shared, private network so your streaming endpoint feels like it is on the same LAN. Here is a friendly walkthrough:

1. **Create your ZeroTier account and network:** sign in at https://my.zerotier.com, click **Create A Network**, and note the 16-digit network ID.
2. **Install the ZeroTier client on your host PC:** grab the installer for Windows/macOS/Linux from https://www.zerotier.com/download/, sign in, and join your network with `zerotier-cli join <network-id>` (or the GUI’s **Join Network** button). Allow the virtual adapter when prompted.
3. **Approve and authorize the host:** in the ZeroTier web console, find the host entry under **Members**, check **Auth?**, and optionally assign an easy-to-remember managed IP (e.g., `10.147.20.10`). Leave **Allow TCP/UDP** enabled.
4. **Repeat on your client device:** install ZeroTier, join the same network, and authorize it in the console. Assign a managed IP if you want predictable addresses.
5. **Test connectivity:** open a terminal on the client and `ping` the host’s managed IP. If blocked, temporarily disable firewalls or add rules for the ZeroTier interface, then re-test.
6. **Expose your stream endpoint on ZeroTier:** configure your streamer (Sunshine, Parsec, Steam, etc.) to listen on all interfaces or explicitly on the ZeroTier adapter. If your app binds to specific addresses, use the host’s managed IP.
7. **Use the ZeroTier URL in RetroBat Anywhere:** build your streaming URL with the host’s managed IP and port (e.g., `https://10.147.20.10:47990`). Paste it into the page and launch your session.
8. **Keep it tidy:** label members in the ZeroTier console, disable unused devices, and keep your account protected with MFA. Remove authorization for lost devices immediately.

That is it—you now have a cozy, LAN-like tunnel for RetroBat streaming without exposing ports to the public internet.

## Notes
- Checklist progress is stored in `localStorage` for convenience.
- The page never uploads endpoints or content; everything stays in your browser.
- Keep your library legal—dump your own cartridges and discs.
