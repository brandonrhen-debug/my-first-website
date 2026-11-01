'use strict';
// Current inventory confirmed by the owner on October 31, 2026.
// Confirmation date is not a deployment date. Historical files remain separate.
const systems = {
  "truenas": {
    "name": "TrueNAS",
    "status": "CURRENT · OCT 31, 2026",
    "hardware": "Dell OptiPlex 7010 · Intel Core i5-3570 (4 cores) · approximately 24 GiB DDR3 RAM.",
    "purpose": "Primary NAS, media server, and self-hosted application platform.",
    "services": [
      "Jellyfin — Self-hosted media server that organizes and streams my movies, television shows, and music.",
      "AFFiNE — Self-hosted knowledge base for organizing my notes, project documentation, and homelab runbooks.",
      "Immich — Self-hosted photo and video management and backup platform.",
      "Nextcloud — Personal cloud storage for accessing and managing my files and media.",
      "Homarr — Centralized dashboard for accessing and organizing my homelab services.",
      "NostalgiaTV — Creates television-style channels and a program guide from my Jellyfin library. Channels can be generated automatically or configured manually.",
      "SMB file sharing — Makes selected NAS storage accessible to other devices over the local network.",
      "Tailscale — Secure mesh networking that allows me to remotely access devices in my homelab.",
      "Cloudflare Tunnel — Provides HTTPS access to selected self-hosted web applications without opening inbound router ports."
    ],
    "connections": "TrueNAS hosts these services.",
    "storage": [
      "256 GB SSD — operating system boot drive.",
      "1 × 8 TB HDD — NAS data storage, shared over SMB.",
      "1 × 2 TB HDD — separate NAS data drive, shared over SMB; not mirrored with the 8 TB drive.",
      "2 × 500 GB small-form-factor HDDs — connected through an external drive enclosure and configured as a TrueNAS mirror, not RAID 0. Approximately 500 GB usable mirrored capacity before filesystem overhead."
    ]
  },
  "proxmox": {
    "name": "Proxmox VE 9.2",
    "status": "CURRENT · OCT 31, 2026",
    "hardware": "Proxmox VE 9.2. Physical host model, processor, and memory are not confirmed.",
    "purpose": "Virtualization host running independent Debian VMs and Docker workloads.",
    "services": [
      "VM 100 · Debian 13 · qBittorrent torrent client with Gluetun/Mullvad WireGuard VPN connectivity",
      "VM 102 · Debian 13 · DocuSeal document signing in Docker, with Cloudflare Tunnel HTTPS access and Tailscale mesh networking",
      "Separate VM · Coolify application deployment platform; VMID and specifications unconfirmed"
    ],
    "connections": "Proxmox hosts three confirmed independent VMs. qBittorrent is paired with Gluetun/Mullvad WireGuard in VM 100. DocuSeal runs in Docker in VM 102 alongside Cloudflare Tunnel and Tailscale. Coolify runs in a separate VM; no connection between the VMs is inferred.",
    "storage": [
      "2 × 1 TB storage drives — drive types, RAID configuration, and exact partitioning are not confirmed."
    ]
  },
  "pi": {
    "name": "Raspberry Pi 4",
    "status": "CURRENT · OCT 31, 2026",
    "hardware": "Raspberry Pi 4. Memory, storage, and operating system are not confirmed.",
    "purpose": "Pi-hole DNS and network-wide filtering.",
    "services": [
      "Pi-hole — DNS and network-wide filtering"
    ],
    "connections": "The Pi hosts Pi-hole. Specific DNS clients, upstream resolvers, and connections to other hosts are not documented.",
    "storage": [
      "Storage details have not been confirmed."
    ]
  },
  "mac": {
    "name": "Headless MacBook Air M1",
    "status": "CURRENT · OCT 31, 2026",
    "hardware": "Apple M1 · 8 GB unified memory · macOS Sequoia.",
    "purpose": "Remote macOS machine and experimentation platform.",
    "services": [
      "OliveTin — Web controls for predefined actions on the headless MacBook Air. Specific configured actions are not documented."
    ],
    "connections": "OliveTin is retained on the Mac. The previous AFFiNE Docker deployment was removed after AFFiNE moved to TrueNAS. No remote-access method is inferred.",
    "storage": [
      "256 GB internal SSD — internal storage."
    ]
  }
};
let selectedSystem = 'truenas';
let selectedView = 'physical';
function element(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}
function renderDetails() {
  const panel = document.getElementById('system-details');
  if (!panel) return;
  const system = systems[selectedSystem];
  panel.setAttribute('data-system', selectedSystem);
  panel.scrollTop = 0;
  const status = element('span', system.status || 'PLACEHOLDER · DETAILS NEEDED');
  status.className = 'status';
  panel.replaceChildren(status, element('h2', system.name));
  if (!system.status) {
    panel.append(element('p', 'Included as a requested inventory placeholder. Ownership, configuration, and deployment are not established by the original repository.'));
  }
  if (selectedView === 'physical') {
    panel.append(element('h3', 'Specifications'), element('p', system.hardware), element('p', system.purpose));
    panel.append(element('h3', 'Storage'));
    const storageList = document.createElement('ul');
    storageList.className = 'storage-rows';
    system.storage.forEach(drive => storageList.append(element('li', drive)));
    panel.append(storageList);
    panel.append(element('h3', 'Hosted services'));
    const chips = document.createElement('ul');
    chips.className = 'service-chips';
    // Only the compact view changes presentation; the complete descriptions remain above.
    const compactServices = {
      truenas: ['Jellyfin', 'AFFiNE', 'Immich', 'Nextcloud', 'Homarr', 'NostalgiaTV', 'SMB file sharing', 'Tailscale', 'Cloudflare Tunnel'],
      proxmox: ['VM 100 · Debian 13', 'qBittorrent', 'Gluetun / Mullvad WireGuard', 'VM 102 · Debian 13', 'Docker', 'DocuSeal', 'Cloudflare Tunnel', 'Tailscale', 'Separate VM · Coolify'],
      pi: ['Pi-hole'], mac: ['OliveTin']
    };
    const serviceColors = {
      Jellyfin: '#B49CF5', AFFiNE: '#E7E7EB', Immich: '#ED9AB6', Nextcloud: '#42B7FF', Homarr: '#EE8CA5', NostalgiaTV: '#EAC17B',
      'SMB file sharing': '#B4B7C0', Tailscale: '#B4B7C0', 'Cloudflare Tunnel': '#F6A04D', qBittorrent: '#87B5ED',
      'Gluetun / Mullvad WireGuard': '#DACB75', Docker: '#67BFFF', DocuSeal: '#B6BBF5', 'Separate VM · Coolify': '#B99AEF', 'Pi-hole': '#EC8995', OliveTin: '#B6CC7D'
    };
    compactServices[selectedSystem].forEach(name => {
      const chip = element('li', name);
      chip.setAttribute('style', '--service-color:' + (serviceColors[name] || 'var(--system-color)'));
      chips.append(chip);
    });
    panel.append(chips);
    const descriptionsButton = element('button', 'Explore service descriptions →');
    descriptionsButton.type = 'button';
    descriptionsButton.className = 'service-descriptions-button';
    descriptionsButton.addEventListener('click', () => {
      const servicesView = document.querySelector('[data-view="services"]');
      servicesView.click();
      panel.focus();
    });
    panel.append(descriptionsButton);
  } else {
    panel.append(element('h3', 'Services & connections'), element('p', system.connections));
    panel.append(element('h3', 'Hosted services'));
    const list = document.createElement('ul');
    system.services.forEach(service => list.append(element('li', service)));
    panel.append(list);
  }
  const link = element('a', 'View this project ↗');
  const projectAnchors = { truenas: 'truenas', proxmox: 'proxmox', pi: 'raspberry-pi', mac: 'macbook-air' };
  link.href = 'projects.html#' + projectAnchors[selectedSystem];
  panel.append(link);
  renderRelationships();
  if (window.requestAnimationFrame) window.requestAnimationFrame(updatePanelScrollHints);
  document.querySelectorAll('.system-node[data-system]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.system === selectedSystem)));
}
document.querySelectorAll('.system-node[data-system]').forEach(node => {
  const select = () => { selectedSystem = node.dataset.system; renderDetails(); };
  node.addEventListener('click', select);
  node.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); }
  });
});
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  selectedView = button.dataset.view;
  document.querySelectorAll('[data-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('view-description').textContent = selectedView === 'physical'
    ? 'Select a system for its hardware and role. Switch views for confirmed host, VM, and service relationships.'
    : 'Select a host above to show its confirmed VM and service relationships below. Lines show hosting relationships, not network routes.';
  renderDetails();
}));
// Existing system links now select the matching interactive card.
function selectLinkedSystem() {
  const key = window.location.hash.slice(1);
  if (document.getElementById('system-details') && Object.hasOwn(systems, key)) {
    selectedSystem = key;
  }
  renderDetails();
}
window.addEventListener('hashchange', selectLinkedSystem);
selectLinkedSystem();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  let count = 0;
  document.querySelectorAll('.software-card').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.status !== filter;
    if (!card.hidden) count++;
  });
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('filter-status').textContent = `Showing ${count} documented application${count === 1 ? '' : 's'}.`;
  document.getElementById('filter-empty').hidden = count !== 0;
}));

// Static, owner-confirmed relationships. No internal endpoints or inferred routes.
function renderRelationships() {
  const container = document.getElementById('service-relationships');
  if (!container) return;
  container.setAttribute('data-system', selectedSystem);
  container.hidden = selectedView !== 'services';
  if (container.hidden) return;
  const graphs = {
  "truenas": "<svg viewBox=\"0 0 630 675\" role=\"img\" aria-label=\"Confirmed hosting relationships for TrueNAS\" style=\"display:block;width:100%;height:auto\"><title>TrueNAS: host to services</title><rect x=\"180\" y=\"10\" width=\"270\" height=\"60\" rx=\"10\" fill=\"var(--card)\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><text x=\"315\" y=\"46\" text-anchor=\"middle\" fill=\"var(--text)\" font-size=\"18\">TrueNAS</text><path d=\"M315 70 V600\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><path d=\"M315 140 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"100\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#B49CF5\"/><text x=\"27\" y=\"125\" fill=\"#B49CF5\" font-size=\"16\">Jellyfin</text><text x=\"27\" y=\"148\" fill=\"#B49CF5\" font-size=\"12\">Movies, TV &amp; music streaming</text><path d=\"M315 140 H345\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"345\" y=\"100\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#E7E7EB\"/><text x=\"357\" y=\"125\" fill=\"#E7E7EB\" font-size=\"16\">AFFiNE</text><text x=\"357\" y=\"148\" fill=\"var(--text)\" font-size=\"12\">Notes, project docs &amp; runbooks</text><path d=\"M315 255 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"215\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#ED9AB6\"/><text x=\"27\" y=\"240\" fill=\"#ED9AB6\" font-size=\"16\">Immich</text><text x=\"27\" y=\"263\" fill=\"var(--text)\" font-size=\"12\">Photo &amp; video management and backup</text><path d=\"M315 255 H345\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"345\" y=\"215\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#42B7FF\"/><text x=\"357\" y=\"240\" fill=\"#42B7FF\" font-size=\"16\">Nextcloud</text><text x=\"357\" y=\"263\" fill=\"var(--text)\" font-size=\"12\">Personal cloud files &amp; media</text><path d=\"M315 370 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"330\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#EE8CA5\"/><text x=\"27\" y=\"355\" fill=\"#EE8CA5\" font-size=\"16\">Homarr</text><text x=\"27\" y=\"378\" fill=\"var(--text)\" font-size=\"12\">Dashboard for homelab services</text><path d=\"M315 370 H345\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"345\" y=\"330\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#EAC17B\"/><text x=\"357\" y=\"355\" fill=\"#EAC17B\" font-size=\"16\">NostalgiaTV</text><text x=\"357\" y=\"378\" fill=\"var(--text)\" font-size=\"12\">TV channels &amp; guide from Jellyfin<tspan x=\"357\" dy=\"17\">Automatic or manual channels</tspan></text><path d=\"M315 485 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"445\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#B4B7C0\"/><text x=\"27\" y=\"470\" fill=\"#B4B7C0\" font-size=\"16\">SMB file sharing</text><text x=\"27\" y=\"493\" fill=\"var(--text)\" font-size=\"12\">NAS file sharing over the local network</text><path d=\"M315 485 H345\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"345\" y=\"445\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#B4B7C0\"/><text x=\"357\" y=\"470\" fill=\"#B4B7C0\" font-size=\"16\">Tailscale</text><text x=\"357\" y=\"493\" fill=\"var(--text)\" font-size=\"12\">Secure mesh access to lab devices</text><path d=\"M315 600 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"560\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#F6A04D\"/><text x=\"27\" y=\"585\" fill=\"#F6A04D\" font-size=\"16\">Cloudflare Tunnel</text><text x=\"27\" y=\"608\" fill=\"var(--text)\" font-size=\"12\">HTTPS access without inbound ports</text></svg>",
  "proxmox": "<svg viewBox=\"0 0 630 330\" role=\"img\" aria-label=\"Confirmed hosting relationships for Proxmox VE 9.2\" style=\"display:block;width:100%;height:auto\"><title>Proxmox VE 9.2: host to services and independent VMs</title><rect x=\"180\" y=\"10\" width=\"270\" height=\"60\" rx=\"10\" fill=\"var(--card)\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><text x=\"315\" y=\"46\" text-anchor=\"middle\" fill=\"var(--text)\" font-size=\"18\">Proxmox VE 9.2</text><path d=\"M315 70 V255\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><path d=\"M315 140 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"100\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"var(--system-color)\"/><text x=\"27\" y=\"125\" fill=\"var(--text)\" font-size=\"16\">VM 100 · Debian 13</text><text x=\"27\" y=\"148\" fill=\"#87B5ED\" font-size=\"12\">qBittorrent · torrent client</text><text x=\"27\" y=\"171\" fill=\"#DACB75\" font-size=\"12\">Gluetun / Mullvad WireGuard VPN</text><path d=\"M315 140 H345\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"345\" y=\"100\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"var(--system-color)\"/><text x=\"357\" y=\"125\" fill=\"var(--text)\" font-size=\"16\">VM 102 · Debian 13</text><text x=\"357\" y=\"148\" fill=\"#67BFFF\" font-size=\"12\">Docker → DocuSeal · document signing</text><text x=\"357\" y=\"171\" fill=\"#F6A04D\" font-size=\"12\">Cloudflare Tunnel · Tailscale</text><path d=\"M315 255 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"215\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"var(--system-color)\"/><text x=\"27\" y=\"240\" fill=\"var(--text)\" font-size=\"16\">Separate VM · VMID unknown</text><text x=\"27\" y=\"263\" fill=\"#B99AEF\" font-size=\"12\">Coolify · app deployment</text></svg>",
  "pi": "<svg viewBox=\"0 0 630 215\" role=\"img\" aria-label=\"Confirmed hosting relationships for Raspberry Pi 4\" style=\"display:block;width:100%;height:auto\"><title>Raspberry Pi 4: host to services</title><rect x=\"180\" y=\"10\" width=\"270\" height=\"60\" rx=\"10\" fill=\"var(--card)\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><text x=\"315\" y=\"46\" text-anchor=\"middle\" fill=\"var(--text)\" font-size=\"18\">Raspberry Pi 4</text><path d=\"M315 70 V140\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><path d=\"M315 140 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"100\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#EC8995\"/><text x=\"27\" y=\"125\" fill=\"#EC8995\" font-size=\"16\">Pi-hole</text><text x=\"27\" y=\"148\" fill=\"var(--text)\" font-size=\"12\">DNS &amp; network-wide filtering</text></svg>",
  "mac": "<svg viewBox=\"0 0 630 215\" role=\"img\" aria-label=\"Confirmed hosting relationships for MacBook Air M1\" style=\"display:block;width:100%;height:auto\"><title>MacBook Air M1: host to services</title><rect x=\"180\" y=\"10\" width=\"270\" height=\"60\" rx=\"10\" fill=\"var(--card)\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><text x=\"315\" y=\"46\" text-anchor=\"middle\" fill=\"var(--text)\" font-size=\"18\">MacBook Air M1</text><path d=\"M315 70 V140\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><path d=\"M315 140 H285\" fill=\"none\" stroke=\"var(--system-color)\" stroke-width=\"2\"/><rect x=\"15\" y=\"100\" width=\"270\" height=\"90\" rx=\"9\" fill=\"var(--card)\" stroke=\"#B6CC7D\"/><text x=\"27\" y=\"125\" fill=\"#B6CC7D\" font-size=\"16\">OliveTin</text><text x=\"27\" y=\"148\" fill=\"var(--text)\" font-size=\"12\">Web controls for predefined actions</text></svg>"
};
  // Markup is fixed local content, never user input.
  container.innerHTML = graphs[selectedSystem];
}

// Native, focusable scroll regions keep every description and SVG node reachable.
function updatePanelScrollHints() {
  for (const [selector, hintId] of [['.homelab-page .diagram', 'explorer-scroll-hint'], ['.homelab-page .details', 'details-scroll-hint']]) {
    const panel = document.querySelector(selector);
    const hint = document.getElementById(hintId);
    if (!panel || !hint) continue;
    const more = panel.scrollHeight > panel.clientHeight + 2;
    hint.textContent = more ? 'More content below · focus panel, then ↑ / ↓ or scroll' : 'All panel content is visible';
    if (more && panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2) {
      hint.textContent = 'End of panel · scroll up for earlier content';
    }
  }
}
if (document.getElementById('system-details')) {
  window.addEventListener('resize', updatePanelScrollHints);
  window.addEventListener('load', updatePanelScrollHints);
  document.querySelectorAll('.homelab-page .diagram, .homelab-page .details').forEach(panel => {
    panel.addEventListener('scroll', updatePanelScrollHints, { passive: true });
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(updatePanelScrollHints).observe(panel);
  });
}
