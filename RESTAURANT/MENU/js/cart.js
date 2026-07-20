//data 
let cart = JSON.parse(localStorage.getItem("cart")) || [

    {
        id: 1,
        name: "Margherita Pizza",
        price: 299,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300"
    },

    {
        id: 2,
        name: "Cheese Burger",
        price: 199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
    },

    {
        id: 3,
        name: "Cold Coffee",
        price: 120,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300"
    }

];

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

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

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

    subtotal.innerHTML = `₹${sub}`;

    gst.innerHTML = `₹${gstAmount}`;

    delivery.innerHTML = `₹${deliveryCharge}`;

    discount.innerHTML = `- ₹${discountAmount}`;

    grandTotal.innerHTML = `₹${total}`;

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

        alert("🎉 Promo Code Applied!");

    } else {

        promoDiscount = 0;

        alert("❌ Invalid Promo Code!");

    }

    updateBill();

});

// order place 
const placeOrder = document.getElementById("placeOrder");

placeOrder.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("🛒 Your cart is empty!");

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

    alert("🎉 Order Placed Successfully!");

    let giveFeedback = confirm(
        "Thank you for your order ❤️\nWould you like to give feedback?"
    );


    if (giveFeedback) {

        window.location.href = "../pages/feedback.html";

    }
    else {

        setTimeout(() => {
            window.location.href = "order-history.html?feedback=true";
        }, 500);

    }

});

//enter to apply coupon 
promoCode.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        applyPromo.click();

    }

});


updateBill();
