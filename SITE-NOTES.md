# BrandonRhen.com — local redesign

Buildless HTML, CSS, and vanilla JavaScript. Open index.html locally; no installation or build is required. Nothing has been deployed.

## Files and maintenance

- index.html: home, current featured projects, experimentation platform, newest-first timeline.
- homelab.html: SVG inventory and dated hardware overview.
- projects.html: project motivations, documented integrations, and lessons.
- software.html: catalog and lifecycle filters. Entries use confirmed active or retired status as of October 31, 2026. No application is confirmed experimental; the empty filter explains this.
- archives.html: archive index and historical context.
- documents.html: modern reading edition, original journal words and section IDs preserved; invalid markup repaired.
- archive/december-2025/: verbatim original documents.html, original homepage, stylesheet, script, and assets. Leave these historical files unchanged. The original has known accessibility and markup limitations.
- style.css: shared design tokens, layout, responsive rules, and reduced-motion handling.
- script.js: systems data, accessible SVG selection, details views, and software filtering. Add verified system details in the systems object. SVG nodes use matching data-system keys. renderRelationships supplies fixed SVG hosting relationships for the selected host in the Services view. Keep this diagram data synchronized with systems and the static inventory.

Primary navigation is static HTML on all six modern pages, so it also works without JavaScript. Keep it synchronized when adding pages. Catalog and project content are static HTML for simple editing and no-JavaScript access.

## Content boundaries

The owner confirmed current infrastructure on October 31, 2026. This is an inventory confirmation date, not a deployment, migration, or retirement date. The December 17 and December 28, 2025 dates remain original journal update dates. SVG lines show confirmed host-to-VM or host-to-service relationships, not network routes. Moonfin is a Jellyfin client; its device is unspecified. UBOX is retired; AFFiNE remains active on TrueNAS while its former Mac Docker deployment is retired. Do not infer the current storage layout from the contradictory December 2025 notes.

Still unconfirmed: Proxmox physical specifications, Coolify VMID/specifications, current NAS storage/RAID layout, Pi memory/storage/OS, Moonfin client device, OliveTin actions, UBOX history, precise deployment/migration/retirement dates, and further measured outcomes or lessons. Never publish credentials, addresses of private systems, tokens, or sensitive infrastructure details.

## Preservation and hosting

Original journal SHA-256: 71ef52bbe38a0baa00228f94d456f1572c2d6aa49cd692caff107a5bcc51b0f2

CNAME remains unchanged: www.brandonrhen.com. Existing root asset filenames are unchanged. Keep documents.html and its homelab-hardware, tailscale, cloudflare-setup, jellyfin-setup, and nextcloud-setup IDs for existing links. Relative paths are compatible with static GitHub Pages hosting. The local folder has no Git metadata or deployment settings; verify the actual repository and publishing source separately before any deployment.

Validation performed: local file/fragment links, shared navigation, balanced modern markup, unique IDs, image alt attributes, original journal words and anchors, journal/CNAME checksums, asset equality, and JavaScript behavior using JavaScriptCore with a mocked DOM (click, Space, Enter, both views, and catalog filtering). Rendered browser, screen-reader, and real-device testing remain outstanding.


## Software Shelf logo sources

Reviewed all 23 entries on October 31, 2026: 21 Active, 0 Experimental, 2 Retired. No entries or lifecycle statuses changed. Ubuntu Server is the displayed software name for the retired UBOX system; its description reflects the owner's confirmed migration to Proxmox. Historical UBOX references on other pages remain untouched.

All new images are local, displayed in the existing 72 × 72 icon area with object-fit: contain. Original multicolor assets are unchanged. Simple Icons are unchanged monochrome SVG silhouettes, displayed white using CSS inversion for the dark background; this does not recolor multicolor artwork or change the card accents. The generic macOS wordmark identifies macOS, without claiming to be Sequoia-specific artwork. Gluetun's icon identifies Gluetun within the composite VPN-stack entry, not Mullvad or WireGuard.

### Existing assets reused

| Entry | Local asset | Provenance / rights note |
| --- | --- | --- |
| TrueNAS | truenaslogo.webp | Supplied in the original workspace; recognizable vendor mark, unchanged. Original download/license provenance not recorded. |
| Jellyfin | jellyfinlogo.png | Supplied in the original workspace; unchanged. Original download/license provenance not recorded. |
| Nextcloud | Nextcloud-Logo.webp | Supplied in the original workspace; unchanged. Original download/license provenance not recorded. |
| Tailscale | tailscalelogo.webp | Supplied in the original workspace; unchanged. Original download/license provenance not recorded. |
| Cloudflare Tunnel | cloudflarelogo.webp | Supplied in the original workspace; unchanged. Original download/license provenance not recorded. |
| Proxmox VE 9.2 | assets/images/proxmox-logo.svg | Official Proxmox media kit, previously verified: https://proxmox.com/en/about/company-details/media-kit . Unchanged vendor artwork; attribution/source also in assets/images/README.md. |

### Newly downloaded assets

Repository software licenses below are retained as supplied; trademark rights remain with each project. No claim is made that a software license grants endorsement or trademark ownership. Original files are unchanged, and the raw source URLs provide the preferred SVG source where applicable. License notices are retained alongside assets. Source links are accessible from each new logo.

| Local asset (under assets/images/software/) | Upstream source | License / credit |
| --- | --- | --- |
| moonfin.svg | https://raw.githubusercontent.com/Moonfin-Client/Moonfin-Core/main/assets/icons/moonfin_logo.svg | Moonfin-Client contributors; upstream GPL-2.0 license retained. |
| affine.png | https://raw.githubusercontent.com/toeverything/AFFiNE/canary/packages/frontend/core/public/favicon-192.png | MIT for frontend content; copyright TOEVERYTHING PTE. LTD. and affiliates. Both root license and LICENSE-MIT retained. |
| immich.svg | https://raw.githubusercontent.com/immich-app/immich/main/design/immich-logo.svg | Immich contributors; upstream AGPL-3.0 license retained. |
| homarr.svg | https://raw.githubusercontent.com/homarr-labs/homarr/dev/apps/docs/public/img/logo.svg | Homarr contributors; upstream Apache-2.0 license retained. |
| docuseal.svg | https://raw.githubusercontent.com/docusealco/docuseal/master/public/favicon.svg | DocuSeal contributors; upstream AGPL-3.0 license retained. |
| coolify.svg | https://raw.githubusercontent.com/coollabsio/coolify/main/public/coolify-logo.svg | Coolify / coollabsio contributors; upstream Apache-2.0 license retained. |
| olivetin.svg | https://raw.githubusercontent.com/OliveTin/OliveTin/main/frontend/OliveTinLogo.svg | OliveTin contributors; upstream AGPL-3.0 license retained. |
| gluetun.svg | https://raw.githubusercontent.com/qdm12/gluetun/master/doc/logo.svg | qdm12 / Gluetun contributors; upstream MIT copyright/license notice retained. |
| debian.svg | https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/debian.svg | Simple Icons contributors, CC0-1.0 collection license retained; underlying brand/trademark rights remain separate. Debian swirl artwork by the Debian Project: CC BY-SA 3.0 as recorded by Simple Icons metadata; https://www.debian.org/logos/ and https://creativecommons.org/licenses/by-sa/3.0/ . No artwork changes. |
| docker.svg | https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/docker.svg | Simple Icons contributors, CC0-1.0 collection license retained; underlying brand/trademark rights remain separate. |
| qbittorrent.svg | https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/qbittorrent.svg | Simple Icons contributors, CC0-1.0 collection license retained; underlying brand/trademark rights remain separate. |
| pihole.svg | https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pihole.svg | Simple Icons contributors, CC0-1.0 collection license retained; underlying brand/trademark rights remain separate. |
| ubuntu.svg | https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/ubuntu.svg | Simple Icons contributors, CC0-1.0 collection license retained; underlying brand/trademark rights remain separate. |
| macos.svg | https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/macos.svg | Simple Icons contributors, CC0-1.0 collection license retained; underlying brand/trademark rights remain separate. |

AFFiNE's icon is reused for the retired Mac Docker deployment; that does not change AFFiNE's active TrueNAS status. Simple Icons source/brand metadata was checked against https://github.com/simple-icons/simple-icons/blob/13.21.0/_data/simple-icons.json and current repository assets. The CC0 collection license does not override any per-brand artwork restrictions; Debian's credit/license is recorded separately above. Apple owns the macOS wordmark; the supplied Simple Icons silhouette is a referential wordmark, not an Apple endorsement.

### Intentional text fallbacks

- **SMB file sharing:** a protocol/service category, not a specific application with a verified official logo. Do not substitute Samba's logo without confirming Samba is the implementation.
- **NostalgiaTV:** authentic application identified at https://play.google.com/store/apps/details?id=com.nostalgiatv . No clear reusable license for its developer-supplied icon was verified, so the text fallback remains. The unrelated Bulgarian Nostalgia television-channel logo must not be used.

The existing five inherited vendor images have incomplete license provenance; they were preserved as requested rather than assigned an invented license. No downloaded logo is AI-generated, redrawn, or hotlinked.
