'use strict';
// Derive the initial count from the shelf, just as the shared filters do on selection.
(() => {
  const status = document.getElementById('filter-status');
  if (!status) return;
  const count = document.querySelectorAll('.software-card:not([hidden])').length;
  status.textContent = `Showing ${count} documented application${count === 1 ? '' : 's'}.`;
})();
