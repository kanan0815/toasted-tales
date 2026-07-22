function goBack() {
    window.location.href = "../pages/home.html";
}

function addCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const lang = localStorage.getItem("language") || "EN";
    const t = translations[lang];

    showToast((t[name] || name) + " " + t.addedToCart);
}
