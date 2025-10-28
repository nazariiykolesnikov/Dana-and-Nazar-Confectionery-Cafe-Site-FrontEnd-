document.addEventListener("DOMContentLoaded", function () {
  const cartPanel = document.getElementById("cartPanel2");
  const desktopCartIcon = document.getElementById("user-account-icon-desktop");
  const mobileCartIcon = document.getElementById("user-account-menu");
  const closeCartBtn = document.getElementById("closeCartBtn2");

  desktopCartIcon?.addEventListener("click", e => {
    e.preventDefault();
    cartPanel.classList.add("visible");
  });

  mobileCartIcon?.addEventListener("click", e => {
    e.preventDefault();
    cartPanel.classList.add("visible");
  });

  closeCartBtn?.addEventListener("click", () => {
    cartPanel.classList.remove("visible");
  });
});
