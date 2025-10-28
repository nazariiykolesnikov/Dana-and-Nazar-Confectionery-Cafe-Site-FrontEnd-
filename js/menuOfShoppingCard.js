document.addEventListener("DOMContentLoaded", function () {
  const cartPanel = document.getElementById("cartPanel1");
  const desktopCartIcon = document.getElementById("cart-icon-desktop");
  const mobileCartIcon = document.getElementById("shopping-cart-menu");
  const closeCartBtn = document.getElementById("closeCartBtn1");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function groupCartItems() {
    const grouped = {};
    cart.forEach(item => {
      if (!grouped[item.name]) {
        grouped[item.name] = { ...item, quantity: 1 };
      } else {
        grouped[item.name].quantity += 1;
      }
    });
    return Object.values(grouped);
  }

  function updateCartUI() {
    const cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";
    const groupedItems = groupCartItems();

    groupedItems.forEach(item => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.marginBottom = "12px";

      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;margin-right:10px;border-radius:6px;">
        <div style="flex:1">
          <strong>${item.name}</strong><br>
          <span>$${item.price}</span>
          <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">
            <button class="decreaseQty" data-name="${item.name}" style="padding:4px 8px;">➖</button>
            <span>${item.quantity}</span>
            <button class="increaseQty" data-name="${item.name}" style="padding:4px 8px;">➕</button>
          </div>
        </div>
        <button class="removeItem" data-name="${item.name}" style="margin-left:auto;">🗑️</button>
      `;
      cartList.appendChild(li);
    });

    document.querySelectorAll(".increaseQty").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const item = cart.find(i => i.name === name);
        if (item) {
          cart.push({ ...item });
          saveCart();
          updateCartUI();
        }
      });
    });

    document.querySelectorAll(".decreaseQty").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const index = cart.findIndex(i => i.name === name);
        if (index !== -1) {
          const count = cart.filter(i => i.name === name).length;
          if (count > 1) {
            cart.splice(index, 1);
          } else {
            cart = cart.filter(i => i.name !== name);
          }
          saveCart();
          updateCartUI();
        }
      });
    });

    document.querySelectorAll(".removeItem").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        cart = cart.filter(i => i.name !== name);
        saveCart();
        updateCartUI();
      });
    });
  }

  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".pro");
      const item = {
        name: card.dataset.name,
        price: card.dataset.price,
        image: card.dataset.image
      };
      cart.push(item);
      saveCart();
      updateCartUI();
      cartPanel.classList.add("visible");
    });
  });

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

  updateCartUI();
});