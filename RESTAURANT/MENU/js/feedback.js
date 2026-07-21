const feedbackForm = document.getElementById("feedbackForm");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked');

    if (!rating) {
        alert("Please select an overall rating.");
        return;
    }

    popup.classList.add("show");
    overlay.classList.add("show");

    feedbackForm.reset();
});

function closePopup() {
    popup.classList.remove("show");
    overlay.classList.remove("show");
}