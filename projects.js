'use strict';
// Projects-only enhancement. Detailed copy stays in the page's HTML templates.
(() => {
  const panel = document.getElementById('project-details');
  if (!panel) return;
  const cards = [...document.querySelectorAll('.project-selector')];
  const hint = document.getElementById('project-scroll-hint');
  const legacy = { 'project-01': 'truenas', 'project-02': 'proxmox', 'project-03': 'macbook-air', 'project-04': 'raspberry-pi' };
  function updateScrollHint() {
    const overflow = panel.scrollHeight > panel.clientHeight + 2;
    hint.textContent = overflow
      ? (panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2
        ? 'End of details · scroll up for earlier content'
        : 'More details below · focus panel, then ↑ / ↓ or scroll')
      : 'Project details · select another card to explore';
  }
  function selectProject(key) {
    const card = cards.find(item => item.dataset.project === key) || cards[0];
    const template = document.getElementById('project-content-' + card.dataset.project);
    panel.replaceChildren(template.content.cloneNode(true));
    panel.style.setProperty('--project-color', card.style.getPropertyValue('--project-color'));
    panel.dataset.project = card.dataset.project;
    panel.scrollTop = 0;
    cards.forEach(item => item.setAttribute('aria-pressed', String(item === card)));
    requestAnimationFrame(updateScrollHint);
  }
  function selectFromHash() {
    const hash = window.location.hash.slice(1);
    selectProject(legacy[hash] || hash || 'truenas');
  }
  cards.forEach(card => card.addEventListener('click', () => {
    selectProject(card.dataset.project);
    // Reflect selection without browser fragment scrolling the desktop dashboard.
    history.replaceState(null, '', '#' + card.dataset.project);
  }));
  window.addEventListener('hashchange', selectFromHash);
  window.addEventListener('resize', updateScrollHint);
  window.addEventListener('load', updateScrollHint);
  panel.addEventListener('scroll', updateScrollHint, { passive: true });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(updateScrollHint).observe(panel);
  selectFromHash();
})();
