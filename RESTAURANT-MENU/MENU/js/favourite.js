console.log("Favourite JS loaded");

// ADD TO FAVOURITES
function addFavourite(name, price, image) {

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    const lang = localStorage.getItem("language") || "EN";
    const t = translations[lang];

    if (favourites.some(item => item.name === name)) {
        showToast((t[name] || name) + " " + t.alreadyFavourite);
        return;
    }

    favourites.push({
        name,
        price,
        image: new URL(image, window.location.href).href
    });

    localStorage.setItem("favourites", JSON.stringify(favourites));

    showToast("❤️ " + t.addedToFavourite);
}


// DISPLAY FAVOURITES
document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("favoritesContainer");

    if (!container) return;

    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    const lang = localStorage.getItem("language") || "EN";
    const t = translations[lang];

    function renderFavourites() {

        container.innerHTML = "";

        if (favourites.length === 0) {

            container.innerHTML = `
            <div class="no-favourites">
                <i class="fa-solid fa-heart-crack"></i>

                <h3 data-translate="noFavouriteItems">
                    No Favourite Items
                </h3>

                <p data-translate="addFavouriteFood">
                    Add your favourite food from menu
                </p>
            </div>
            `;

            translatePage(lang);
            return;
        }

        favourites.forEach(item => {

            const displayName = t[item.name] || item.name;

            const card = document.createElement("div");
            card.className = "favorites-grid-card";

            card.innerHTML = `
                <div class="grid-card-heart">
                    <i class="fa-solid fa-heart"></i>
                </div>

                <div class="grid-card-image-box">
                    <img src="${item.image}" class="food-image">
                </div>

                <div class="grid-card-info">

                    <h3>${displayName}</h3>

                    <p class="grid-card-price">
                        ${convertPrice(item.price)}
                    </p>

                    <div class="fav-buttons">

                        <button class="add-btn">
                            ${t.add}
                        </button>

                        <button class="remove-btn">
                            Remove
                        </button>

                    </div>

                </div>
            `;

            // ADD TO CART
            card.querySelector(".add-btn").addEventListener("click", () => {

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                let existing = cart.find(c => c.name === item.name);

                if (existing) {
                    existing.quantity++;
                } else {
                    cart.push({
                        id: Date.now(),
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        image: item.image
                    });
                }

                localStorage.setItem("cart", JSON.stringify(cart));

                showToast((t[item.name] || item.name) + " " + t.addedToCart);

            });


            // REMOVE
            card.querySelector(".remove-btn").addEventListener("click", () => {

                favourites = favourites.filter(f => f.name !== item.name);

                localStorage.setItem(
                    "favourites",
                    JSON.stringify(favourites)
                );

                showToast("💔 " + t.removedFromFavourite);

                renderFavourites();

            });

            container.appendChild(card);

        });

    }

    renderFavourites();

});
