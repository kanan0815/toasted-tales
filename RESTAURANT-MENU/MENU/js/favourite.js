console.log("Favourite JS loaded");

function addFavourite(name, price, image) {
    let favourites = JSON.parse(
        localStorage.getItem("favourites")
    ) || [];

    let alreadyExists = favourites.some(
        item => item.name === name
    );

    if (alreadyExists) {
        alert(name + " already in favourites ❤️");
        return;
    }

    favourites.push({
        name: name,
        price: price,
        image: new URL(image, window.location.href).href
    });

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );
    alert(name + " added to favourites ❤️");

}
// DISPLAY FAVOURITE PAGE ITEMS
document.addEventListener("DOMContentLoaded", () => {

    let container = document.getElementById("favoritesContainer");

    // only run on favourite page

    if (!container) return;
    let favourites = JSON.parse(
        localStorage.getItem("favourites")
    ) || [];

    if (favourites.length === 0) {
        container.innerHTML = `
        <div class="no-favourites">
            <h3>❤️ No Favourite Items</h3>
            <p>Add your favourite food from menu</p>
        </div>
        `;

        return;

    }
    const lang = localStorage.getItem("language") || "EN";
    const t = translations[lang];

    favourites.forEach((item) => {

        const displayName = t[item.name] || item.name;

        let card = document.createElement("div");
        card.classList.add("favorites-grid-card");

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

            <button class="add-btn" data-translate="add">
                ${t.add}
            </button>
        </div>
    `;

        container.appendChild(card);

    });

    // ADD TO CART FROM FAVOURITE PAGE
    let favouriteButtons = document.querySelectorAll(".add-btn");

    let cartData = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    favouriteButtons.forEach((button) => {

        button.addEventListener("click", () => {

            let card = button.closest(".favorites-grid-card");

            let displayName = card.querySelector("h3").innerText;

            let price = Number(
                card.querySelector(".grid-card-price")
                    .innerText
                    .replace("₹", "")
            );

            let foodImage = card.querySelector(".food-image").src;

            // Get original translation key
            let originalItem = favourites.find(
                f => (t[f.name] || f.name) === displayName
            );

            let foodKey = originalItem ? originalItem.name : displayName;

            let existingFood = cartData.find(
                item => item.name === foodKey
            );

            if (existingFood) {
                existingFood.quantity += 1;

                if (!existingFood.image) {
                    existingFood.image = foodImage;
                }

            } else {

                cartData.push({
                    id: Date.now(),
                    name: foodKey,
                    price: price,
                    quantity: 1,
                    image: foodImage
                });

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(cartData)
            );

            alert((t[foodKey] || foodKey) + " added to cart 🛒");
        });

    });

});