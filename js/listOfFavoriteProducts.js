document.addEventListener("DOMContentLoaded", () => {
  const favoritesPanel = document.getElementById('favoritesPanel');
  const favoriteList = document.getElementById('favoriteItems');
  const closeFavoritesBtn = document.getElementById('closeFavoritesBtn');

  // Відкриття панелі при натисканні на сердечко в навігації
  document.querySelectorAll('a[href="#"]').forEach(link => {
    const img = link.querySelector('img');
    if (img && img.classList.contains('fa-heart')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        favoritesPanel.classList.toggle('active');
        updateFavoritesUI();
      });
    }
  });

  // Закриття панелі
  closeFavoritesBtn.addEventListener('click', () => {
    favoritesPanel.classList.remove('active');
  });

  // Повідомлення про видалення
  function showRemovedMessage(name) {
    const msg = document.createElement('div');
    msg.textContent = `Видалено з улюбленого 💔 "${name}"`;
    msg.style.position = 'fixed';
    msg.style.bottom = '20px';
    msg.style.left = '50%';
    msg.style.transform = 'translateX(-50%)';
    msg.style.background = '#9b1762';
    msg.style.color = '#fff';
    msg.style.padding = '10px 20px';
    msg.style.borderRadius = '8px';
    msg.style.zIndex = '10000';
    msg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2500);
  }

  // Відображення списку улюбленого
  function updateFavoritesUI() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteList.innerHTML = '';

    if (favorites.length === 0) {
      favoriteList.innerHTML = '<li>💔 No favorites yet</li>';
      setTimeout(() => {
        favoritesPanel.classList.remove('active');
      }, 1000);
      return;
    }

    favorites.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div style="flex:1">
          <strong>${item.name}</strong><br>
          <span>$${item.price}</span>
        </div>
        <button class="removeFavoriteBtn" data-name="${item.name}" style="margin-left:auto;">🗑️</button>
      `;
      favoriteList.appendChild(li);
    });

    // Видалення товару
    document.querySelectorAll('.removeFavoriteBtn').forEach(btn => {
      btn.addEventListener('click', function () {
        const name = this.dataset.name;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(item => item.name !== name);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesUI();
        showRemovedMessage(name);
      });
    });
  }
});