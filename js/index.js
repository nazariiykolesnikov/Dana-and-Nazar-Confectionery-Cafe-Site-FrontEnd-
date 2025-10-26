let cart = JSON.parse(localStorage.getItem('cart')) || [];
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector('#videoplayer_video');
  const input = document.querySelector('#videoplayer_input');

  const playBtn = document.querySelector('#playBtn');
  const pauseBtn = document.querySelector('#pauseBtn');
  const stopBtn = document.querySelector('#stopBtn');

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      video.src = URL.createObjectURL(file);
      video.load();
      video.play();
    }
  });

  playBtn.addEventListener('click', () => {
    video.play();
  });

  pauseBtn.addEventListener('click', () => {
    video.pause();
  });

  stopBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
  });
});

if (bar) {
  bar.addEventListener('click', () => nav.classList.add('active'));
}

if (close) {
  close.addEventListener('click', () => nav.classList.remove('active'));
}

document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('active'));
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function showAddedMessage(name) {
  const msg = document.createElement('div');
  msg.textContent = `The good "${name}" has been added to the cart !`;
  msg.style.position = 'fixed';
  msg.style.bottom = '20px';
  msg.style.left = '50%';
  msg.style.transform = 'translateX(-50%)';
  msg.style.background = '#be1262';
  msg.style.color = '#fff';
  msg.style.padding = '10px 20px';
  msg.style.borderRadius = '8px';
  msg.style.zIndex = '10000';
  msg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2500);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function groupCartItems() {
  const grouped = {};
  cart.forEach(item => {
    const key = item.name;
    if (!grouped[key]) {
      grouped[key] = { ...item, quantity: 1 };
    } else {
      grouped[key].quantity += 1;
    }
  });
  return Object.values(grouped);
}

function calculateTotal() {
  return cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
}

function updateCartUI() {
  const cartList = document.getElementById('cartItems');
  cartList.innerHTML = '';
  const groupedItems = groupCartItems();

  groupedItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.marginBottom = '15px';

    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;margin-right:10px;border-radius:4px;">
      <div style="flex:1">
        <strong>${item.name}</strong><br>
        <span>$${item.price}</span>
        <div style="margin-top:5px; display:flex; align-items:center; gap:6px;">
          <button class="decreaseQty" data-name="${item.name}" style="padding:4px 8px; border-radius:50%;">➖</button>
          <span>${item.quantity}</span>
          <button class="increaseQty" data-name="${item.name}" style="padding:4px 8px; border-radius:50%;">➕</button>
        </div>
      </div>
      <button class="removeBtn" data-name="${item.name}" style="margin-left:auto;">Delete</button>
    `;

    cartList.appendChild(li);
  });

  document.querySelectorAll('.removeBtn').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.dataset.name;
      cart = cart.filter(item => item.name !== name);
      saveCart();
      updateCartUI();
    });
  });

  document.querySelectorAll('.decreaseQty').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.dataset.name;
      const index = cart.findIndex(item => item.name === name);
      if (index !== -1) {
        const count = cart.filter(item => item.name === name).length;
        if (count > 1) {
          const i = cart.findIndex(item => item.name === name);
          cart.splice(i, 1); // видаляємо одну одиницю
        } else {
          cart = cart.filter(item => item.name !== name); // повністю видаляємо
        }
        saveCart();
        updateCartUI();
      }
    });
  });

  document.querySelectorAll('.increaseQty').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.dataset.name;
      const item = cart.find(i => i.name === name);
      if (item) {
        cart.push({ ...item });
        saveCart();
        updateCartUI();
      }
    });
  });

  const total = calculateTotal();
  const totalDisplay = document.createElement('li');
  totalDisplay.innerHTML = `<strong>Total amount: $ ${total}</strong>`;
  totalDisplay.style.marginTop = '10px';
  cartList.appendChild(totalDisplay);
}


document.querySelectorAll('.pro').forEach(product => {
  const cartBtn = product.querySelector('.cart');

  cartBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const item = {
      name: product.dataset.name,
      price: product.dataset.price,
      image: product.dataset.image
    };

    cart.push(item);

    saveCart();
    updateCartUI();
    showAddedMessage(item.name);
  });
});

document.querySelectorAll('#lg-bag a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('cartPanel').classList.toggle('active');
  });
});

document.getElementById('closeCartBtn').addEventListener('click', () => {
  document.getElementById('cartPanel').classList.remove('active');
});

document.getElementById('checkoutBtn').addEventListener('click', function() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('Thank you for your order! We will contact you shortly!');
  cart = [];

  saveCart();
  updateCartUI();
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector('#user-menu-toggle');
  const menu = document.querySelector('#user-menu');

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.pro');
      const name = card.dataset.name;
      const price = card.dataset.price;
      const image = card.dataset.image;

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const exists = favorites.find(item => item.name === name);

      if (!exists) {
        favorites.push({ name, price, image });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        button.classList.add('active');

        button.classList.add('pulsing');
        setTimeout(() => {
          button.classList.remove('pulsing');
        }, 400);

        alert(`💖"${name}" added to favorite`);
      } else {
        alert(`"${name}" is already in favorite`);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 7000);
});

updateCartUI();