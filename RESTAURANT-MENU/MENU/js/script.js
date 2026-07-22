
const navItems = document.querySelectorAll(".nav-item");

if (navItems.length > 0) {
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
        });
    });
}

//category cards
const cards = document.querySelectorAll(".card");

if (cards.length > 0) {
    cards.forEach((card) => {
        card.addEventListener("click", () => {

            const title = card.querySelector("h4");

            if (title) {
                const category = title.innerText;

                card.style.transform = "scale(0.95)";

                setTimeout(() => {
                    card.style.transform = "";
                }, 150);

                showToast(category + " Selected")
            }

        });
    });
}
//language selector 
const languageSelect = document.getElementById("languageSelect");

if (languageSelect) {
    languageSelect.addEventListener("change", () => {
        const lang = languageSelect.value;
        localStorage.setItem("language", lang);
        translatePage(lang);
    });

    window.addEventListener("DOMContentLoaded", () => {
        const lang = localStorage.getItem("language") || "EN";
        languageSelect.value = lang;
        translatePage(lang);
        updatePrices();
    });
}

//translate page 
function translatePage(lang) {

    if (typeof translations === "undefined") return;

    const t = translations[lang];
    if (!t) return;

    // Translate all elements
    document.querySelectorAll("[data-translate]").forEach(element => {

        const key = element.dataset.translate;

        if (!t[key]) return;

        // Input & textarea placeholder
        if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA"
        ) {
            element.placeholder = t[key];
        }

        // Page title
        else if (element.tagName === "TITLE") {
            document.title = t[key];
        }

        // Option inside select
        else if (element.tagName === "OPTION") {
            element.textContent = t[key];
        }

        // Normal text
        else {
            element.textContent = t[key];
        }

    });

    // Update all prices
    document.querySelectorAll(".price").forEach(price => {
        const amount = price.dataset.price;
        if (amount) {
            price.textContent = convertPrice(amount);
        }
    });

    // Save selected language
    localStorage.setItem("language", lang);
}

//banner
const banner = document.querySelector(".banner");

if (banner) {
    banner.addEventListener("mouseenter", () => {
        banner.style.transform = "scale(1.02)";
        banner.style.transition = "0.3s";
    });

    banner.addEventListener("mouseleave", () => {
        banner.style.transform = "scale(1)";
    });
}

//profile edit 
const modal = document.getElementById("profileModal");
const editBtn = document.getElementById("editProfileBtn");
const closeBtn = document.querySelector(".close-profile");
const saveBtn = document.getElementById("saveProfile");

// Input form fields from modal
const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editPhone = document.getElementById("editPhone");
const editAddress = document.getElementById("editAddress");

// Profile display elements on the main page
const profileName = document.querySelector(".user-display-name");
const profileEmail = document.querySelector(".user-display-email");
const profilePhone = document.querySelector(".user-phone");
const profileAddress = document.querySelector(".user-address");

// Load saved profile data when page opens
if (profileName && profileEmail && profilePhone && profileAddress) {
    const savedName = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");
    const savedPhone = localStorage.getItem("phone");
    const savedAddress = localStorage.getItem("address");

    if (savedName) profileName.innerText = savedName;
    if (savedEmail) profileEmail.innerText = savedEmail;
    if (savedPhone) profilePhone.innerText = savedPhone;
    if (savedAddress) profileAddress.innerText = savedAddress;
}

// Open modal and pre-fill fields with current local storage values
if (editBtn) {
    editBtn.addEventListener("click", () => {
        modal.style.display = "flex";

        editName.value = localStorage.getItem("username") || "";
        editEmail.value = localStorage.getItem("email") || "";
        editPhone.value = localStorage.getItem("phone") || "";
        editAddress.value = localStorage.getItem("address") || "";
    });
}

// Close popup modal
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// Save profile data changes
if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        const name = editName.value.trim();
        const email = editEmail.value.trim();
        const phone = editPhone.value.trim();
        const address = editAddress.value.trim();

        // Check if required fields are missing
        if (name === "" || email === "" || phone === "" || address === "") {

            const lang = localStorage.getItem("language") || "EN";
            const t = translations[lang];

            showToast(t.pleaseFillAllFields);

            return;
        }

        // Save new values to Local Storage
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("address", address);

        // Update the textual layout on screen immediately
        profileName.innerText = name;
        profileEmail.innerText = email;
        profilePhone.innerText = phone;
        profileAddress.innerText = address;

        modal.style.display = "none";
    });
}

// Close popup when user clicks outside the modal box container
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

//welcome
window.addEventListener("load", () => {
    console.log("🍽️ Welcome to My Restaurant!");
});

// delivery address
const addAddressBtn = document.getElementById("addAddressBtn");

if (addAddressBtn) {
    addAddressBtn.addEventListener("click", () => {

        const addressType = prompt("Enter Address Type (Home/Work/Other):");
        if (!addressType) return;

        const address = prompt("Enter Full Address:");
        if (!address) return;

        const addressList = document.querySelector(".profile-menu-list");

        const newAddress = document.createElement("div");
        newAddress.className = "profile-menu-item";
        newAddress.style.display = "flex";
        newAddress.style.justifyContent = "space-between";
        newAddress.style.alignItems = "center";

        newAddress.innerHTML = `
            <div class="menu-item-left" style="display:flex;align-items:center;gap:16px;">
                <div class="menu-item-icon">📍</div>

                <div class="menu-item-text">
                    <h3>${addressType}</h3>
                    <p>${address}</p>
                </div>
            </div>

            <i class="fa-solid fa-pen-to-square edit-address"
               style="cursor:pointer;color:#ff6b00;"></i>
        `;

        addressList.appendChild(newAddress);
    });
}

// Edit Address
document.addEventListener("click", function (e) {

    const editAddressBtn = e.target.closest(".edit-address");
    if (!editAddressBtn) return;

    const card = editAddressBtn.closest(".profile-menu-item");
    const title = card.querySelector("h3");
    const text = card.querySelector("p");

    const newTitle = prompt("Edit Address Type", title.innerText);
    if (newTitle !== null && newTitle.trim() !== "") {
        title.innerText = newTitle;
    }

    const newAddress = prompt("Edit Address", text.innerText);
    if (newAddress !== null && newAddress.trim() !== "") {
        text.innerText = newAddress;
    }

});

window.addEventListener("load", () => {
    const lang = localStorage.getItem("language") || "EN";
    translatePage(lang);
});

function convertPrice(inr) {
    const lang = localStorage.getItem("language") || "EN";
    inr = Number(inr);
    if (lang === "FR") {
        return "€" + (inr * 0.011).toFixed(2);
    }
    if (lang === "KO") {
        return "₩" + Math.round(inr * 16);
    }
    return "₹" + inr;
}

function updatePrices() {
    document.querySelectorAll(".price").forEach(price => {
        let amount = price.getAttribute("data-price");
        if (amount) {
            price.innerText = convertPrice(amount);

        }

    });

}
// Custom Toast
function showToast(message) {
    const toast = document.getElementById("toast");
    const text = document.getElementById("toastMessage");

    if (!toast || !text) {
        alert(message); // Fallback if toast doesn't exist
        return;
    }

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
