document.addEventListener("DOMContentLoaded", function () {
  const favoritesPanel = document.getElementById("favoritesPanel");
  const desktopFavoritesBtn = document.getElementById("desktopFavoritesBtn");
  const mobileFavoritesBtn = document.getElementById("mobileFavoritesBtn");
  const closeFavoritesBtn = document.getElementById("closeFavoritesBtn");
  const favoritesList = document.getElementById("favoriteItems");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function updateFavoritesUI() {
    favoritesList.innerHTML = "";
    favorites.forEach(item => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.marginBottom = "12px";

      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;margin-right:10px;border-radius:6px;">
        <div style="flex:1">
          <strong>${item.name}</strong><br>
          <span>$${item.price}</span>
        </div>
        <button class="removeFavorite" data-name="${item.name}" style="margin-left:auto;">🗑️</button>
      `;
      favoritesList.appendChild(li);
    });

    document.querySelectorAll(".removeFavorite").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        favorites = favorites.filter(i => i.name !== name);
        saveFavorites();
        updateFavoritesUI();
      });
    });
  }

  document.querySelectorAll(".add-to-favorites-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".pro");
      const item = {
        name: card.dataset.name,
        price: card.dataset.price,
        image: card.dataset.image
      };

      const exists = favorites.find(i => i.name === item.name);
      if (!exists) {
        favorites.push(item);
        saveFavorites();
        updateFavoritesUI();
        favoritesPanel.classList.add("visible");
      } else {
        alert(`"${item.name}" is already in favorites`);
      }
    });
  });

  desktopFavoritesBtn?.addEventListener("click", e => {
    e.preventDefault();
    favoritesPanel.classList.add("visible");
  });

  mobileFavoritesBtn?.addEventListener("click", e => {
    e.preventDefault();
    favoritesPanel.classList.add("visible");
  });

  closeFavoritesBtn?.addEventListener("click", () => {
    favoritesPanel.classList.remove("visible");
  });

  updateFavoritesUI();
});