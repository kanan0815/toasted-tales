document.addEventListener("DOMContentLoaded", function () {

    const feedbackForm = document.getElementById("feedbackForm");
    const popup = document.getElementById("popup");
    const okButton = popup.querySelector("button");

    feedbackForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const rating = document.querySelector('input[name="rating"]:checked');

        if (!rating) {
            alert("Please select an overall rating.");
            return;
        }

        // Show popup
        popup.classList.add("show");

        // Reset form
        feedbackForm.reset();

    });


    okButton.addEventListener("click", function () {

        popup.classList.remove("show");

        // Refresh page after clicking OK
        setTimeout(() => {
            location.reload();
        }, 500);

    });

});
