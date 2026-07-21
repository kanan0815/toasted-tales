function goBack() {
    window.history.back();
}

//elements
const paymentForm = document.getElementById("paymentForm");

const cardRadio = document.getElementById("cardRadio");
const upiRadio = document.getElementById("upiRadio");
const cashRadio = document.getElementById("cashRadio");
const bankRadio = document.getElementById("bankRadio");

const cardDetails = document.getElementById("cardDetails");
const upiDetails = document.getElementById("upiDetails");
const bankDetails = document.getElementById("bankDetails");

//hide details 
function hideDetails() {

    cardDetails.classList.remove("show");
    upiDetails.classList.remove("show");
    bankDetails.classList.remove("show");

}

//show details acc to selection
cardRadio.addEventListener("change", () => {
    hideDetails();
    cardDetails.classList.add("show");

});

upiRadio.addEventListener("change", () => {
    hideDetails();
    upiDetails.classList.add("show");

});

cashRadio.addEventListener("change", () => {
    hideDetails();

});

bankRadio.addEventListener("change", () => {
    hideDetails();
    bankDetails.classList.add("show");

});

//card clickable 
const paymentCards = document.querySelectorAll(".payment-card");

paymentCards.forEach(card => {
    card.addEventListener("click", () => {
        const radio = card.querySelector("input[type='radio']");
        if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event("change"));
        }
    });

});

//submit 
paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const selected = document.querySelector("input[name='payment']:checked");
    if (!selected) {
        alert("Please select a payment method 💳");
        return;

    }

    let paymentMethod = "";
    switch (selected.value) {
        case "card":

            const cardNumber = document.getElementById("cardNumber").value.trim();
            const cardHolder = document.getElementById("cardHolder").value.trim();
            const expiry = document.getElementById("expiry").value.trim();
            const cvv = document.getElementById("cvv").value.trim();

            if (
                cardNumber === "" ||
                cardHolder === "" ||
                expiry === "" ||
                cvv === ""
            ) {
                alert("Please fill all card details.");
                return;
            }
            paymentMethod = "Credit / Debit Card";
            break;

        case "upi":
            const upiId = document.getElementById("upiId").value.trim();
            if (upiId === "") {
                alert("Please enter your UPI ID.");
                return;
            }
            paymentMethod = "UPI";
            break;

        case "cash":
            paymentMethod = "Cash on Delivery";
            break;

        case "bank":
            const bank = document.getElementById("bank").value;
            if (bank === "") {
                alert("Please select your bank.");
                return;
            }
            paymentMethod = "Net Banking";
            break;

    }

    // Save Payment Method
    localStorage.setItem("paymentMethod", paymentMethod);

    // Success Message
    alert(
        "Payment Selected Successfully ✅\n\n" +
        "Method: " + paymentMethod
    );

    // Redirect
    window.location.href = "order-history.html";

});