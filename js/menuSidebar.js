document.addEventListener("DOMContentLoaded", () => {
  const barMenu = document.getElementById('bar-menu');
  const mobileNavPanel = document.getElementById('mobileNavPanel');
  const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');

  barMenu?.addEventListener('click', () => {
    mobileNavPanel?.classList.add('active');
  });

  closeMobileNavBtn?.addEventListener('click', () => {
    mobileNavPanel?.classList.remove('active');
  });

  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNavPanel?.classList.remove('active');
    });
  });
});