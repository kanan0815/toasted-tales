
const orderContainer = document.getElementById("orderContainer");
const emptyHistory = document.getElementById("emptyHistory");

const searchInput = document.getElementById("searchInput");
const clearHistory = document.getElementById("clearHistory");

const popup = document.getElementById("popup");
const popupDetails = document.getElementById("popupDetails");
const closePopup = document.getElementById("closePopup");

//load order
let orders = JSON.parse(localStorage.getItem("orders")) || [];

displayOrders(orders);

//display order

function displayOrders(orderList) {

    orderContainer.innerHTML = "";


    if (orderList.length === 0) {

        emptyHistory.style.display = "block";
        return;

    }


    emptyHistory.style.display = "none";


    orderList.forEach((order, index) => {
        let itemsHTML = "";

        order.items.forEach(item => {

            itemsHTML += `

                <div class="food-item">

                    <span>
                    🍽️ ${item.name}
                    </span>

                    <span>
                    ₹${item.price}
                    </span>

                </div>

            `;

        });



        let total = 0;


        order.items.forEach(item => {

            total += item.price * item.quantity;

        });



        orderContainer.innerHTML += `


        <div class="order-card">


            <div class="order-header">


                <h3>
                    ${order.id}
                </h3>


                <span class="status pending">
                    ${order.status}
                </span>


            </div>



            <p class="order-date">

                📅 ${order.date}

                <br>

                ⏰ ${order.time}

            </p>



            <div class="items-box">

                ${itemsHTML}

            </div>



            <h3 class="total">

                Total : ₹${total}

            </h3>



            <div class="actions">


                <button 
                class="view-btn"
                onclick="viewOrder(${index})">

                    View

                </button>



                <button
                class="delete-btn"
                onclick="deleteOrder(${index})">

                    Delete

                </button>


            </div>


        </div>


        `;


    });


}

//view order 
function viewOrder(id) {
    let order = orders.find(
        item => item.id === id
    );

    if (!order) return;
    let total = 0;
    let html = `


    <h3>${order.id}</h3>


    <p>
    <b>Date:</b> ${order.date}
    </p>


    <p>
    <b>Time:</b> ${order.time}
    </p>


    <p>
    <b>Status:</b> ${order.status}
    </p>
    <hr>


    `;
    order.items.forEach(item => {
        let amount = item.price * item.quantity;
        total += amount;
        html += `


        <p>

        ${item.name}
        × ${item.quantity}
        =
        ₹${amount}

        </p>


        `;


    });

    html += `
    <hr>

    <h3>
    Grand Total : ₹${total}
    </h3>

    `;
    popupDetails.innerHTML = html;
    popup.style.display = "flex";
}

//close popup 
if (closePopup) {
    closePopup.onclick = function () {
        popup.style.display = "none";
    };

}
window.onclick = function (e) {

    if (e.target === popup) {
        popup.style.display = "none";
    }
};

//delete order
function deleteOrder(id) {
    if (confirm("Delete this order?")) {
        orders = orders.filter(
            order => order.id !== id
        );

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );
        displayOrders(orders);
    }
}

//clear history 
if (clearHistory) {

    clearHistory.addEventListener("click", () => {
        if (confirm("Clear complete order history?")) {

            localStorage.removeItem("orders");
            orders = [];

            displayOrders(orders);
        }

    });

}

//search order 

if (searchInput) {
    searchInput.addEventListener("input", () => {
        let text =
            searchInput.value.toLowerCase();

        let filtered =
            orders.filter(order =>

                order.id.toLowerCase()
                    .includes(text)
            );

        displayOrders(filtered);

    });

}
//Feedback 
function askFeedback() {
    let answer =
        confirm(
            "Thank you for ordering ❤️\nWould you like to give feedback?"
        );

    if (answer) {
        window.location.href = "feedback.html";


    }
}