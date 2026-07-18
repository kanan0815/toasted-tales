// bottom navigation

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navItems.forEach(nav => nav.classList.remove("active"));

        // Add active class to clicked item
        item.classList.add("active");

    });
});
//category 

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("click", () => {

        const category = card.querySelector("h4").innerText;
        card.style.transform = "scale(0.95)";

        setTimeout(() => {
            card.style.transform = "";
        }, 150);

        // Temporary action
        alert(category + " Selected");

    });

});
// language
const languageSelect = document.getElementById("languageSelect");

languageSelect.addEventListener("change", () => {

    const lang = languageSelect.value;

    localStorage.setItem("language", lang);

    translatePage(lang);

});

window.addEventListener("DOMContentLoaded", () => {

    const lang = localStorage.getItem("language") || "EN";

    languageSelect.value = lang;

    translatePage(lang);

});
function translatePage(lang) {

    const t = translations[lang];

    document.querySelectorAll("[data-translate]").forEach(element => {

        const key = element.dataset.translate;

        if (t[key]) {
            element.innerText = t[key];
        }
        document.querySelectorAll("[data-translate]")

    });

}
// banner

const banner = document.querySelector(".banner");

banner.addEventListener("mouseenter", () => {
    banner.style.transform = "scale(1.02)";
    banner.style.transition = "0.3s";
});

banner.addEventListener("mouseleave", () => {
    banner.style.transform = "scale(1)";
});
// welcome
window.onload = () => {
    console.log("🍽️ Welcome to My Restaurant!");
};