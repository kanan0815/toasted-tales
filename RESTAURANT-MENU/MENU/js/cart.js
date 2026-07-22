// Cart Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function getTranslatedName(name) {

    let lang = localStorage.getItem("language") || "EN";

    if (typeof translations !== "undefined") {
        return translations[lang][name] || name;
    }

    return name;
}

//elements 
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

const subtotal = document.getElementById("subtotal");
const gst = document.getElementById("gst");
const delivery = document.getElementById("delivery");
const discount = document.getElementById("discount");
const grandTotal = document.getElementById("grandTotal");

const cartCount = document.getElementById("cartCount");

// save
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}
function showToast(message) {
    const toast = document.getElementById("toast");
    const text = document.getElementById("toastMessage");

    console.log("Toast:", toast);
    console.log("ToastMessage:", text);

    if (!toast || !text) {
        console.error("Toast elements not found!");
        return;
    }

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
// display
function displayCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartCount.innerHTML = "0";
        updateBill();
        return;
    }

    emptyCart.style.display = "none";
    cart.forEach((item, index) => {
        cartItems.innerHTML += `
        <div class="cart-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="details">
                <h3>${getTranslatedName(item.name)}</h3>
                <p>${convertPrice(item.price)}</p>
                <div class="quantity">
                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>
                </div>
            </div>

            <button class="delete"
            onclick="deleteItem(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>

        `;

    });

    updateBill();

}
//inc or dec
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    displayCart();
}
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    saveCart();
    displayCart();

}
//delete
function deleteItem(index) {
    if (confirm("Remove this item from cart?")) {
        cart.splice(index, 1);
        saveCart();
        displayCart();
    }
}
//bill 
let promoDiscount = 0;
function updateBill() {
    let sub = 0;
    let totalItems = 0;
    cart.forEach(item => {
        sub += item.price * item.quantity;
        totalItems += item.quantity;
    });

    let deliveryCharge = cart.length > 0 ? 40 : 0;
    let gstAmount = Math.round(sub * 0.05);
    let discountAmount = Math.round(sub * promoDiscount);
    let total = sub + gstAmount + deliveryCharge - discountAmount;
    subtotal.innerHTML = convertPrice(sub);
    gst.innerHTML = convertPrice(gstAmount);
    delivery.innerHTML = convertPrice(deliveryCharge);
    discount.innerHTML = convertPrice(discountAmount);
    grandTotal.innerHTML = convertPrice(total);
    cartCount.innerHTML = totalItems;
}

displayCart();

//apply promo code 
const applyPromo = document.getElementById("applyPromo");
const promoCode = document.getElementById("promoCode");

applyPromo.addEventListener("click", () => {
    const code = promoCode.value.trim().toUpperCase();
    if (code === "SAVE20") {
        promoDiscount = 0.20;
        showToast("🎉 Promo Code Applied!");
    } else {
        promoDiscount = 0;
        showToast("❌ Invalid Promo Code!");
    }
    updateBill();
});

// order place 
const placeOrder = document.getElementById("placeOrder");
placeOrder.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("🛒 Your cart is empty!");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let subtotalPrice = 0;
    cart.forEach(item => {
        subtotalPrice += item.price * item.quantity;
    });

    let deliveryCharge = 40;
    let gstAmount = Math.round(subtotalPrice * 0.05);
    let discountAmount = Math.round(subtotalPrice * promoDiscount);

    let totalAmount =
        subtotalPrice +
        deliveryCharge +
        gstAmount -
        discountAmount;

    const now = new Date();
    const order = {
        id: "ORD" + Date.now(),
        date: now.toLocaleDateString("en-GB", {

            day: "2-digit",
            month: "long",
            year: "numeric"
        }),

        time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),

        status: "Pending",
        total: totalAmount,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }))

    };

    // Add newest order first
    orders.unshift(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    // Empty cart
    cart = [];
    saveCart();
    displayCart();
    showToast("🎉 Order Placed Successfully!");

    const modal = document.getElementById("feedbackModal");

    modal.classList.add("show");

    document.getElementById("goFeedback").onclick = () => {
        window.location.href = "../pages/feedback.html";
    };

    document.getElementById("skipFeedback").onclick = () => {
        window.location.href = "order-history.html?feedback=true";
    };

});

//enter to apply coupon 
promoCode.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        applyPromo.click();
    }
});


updateBill();
