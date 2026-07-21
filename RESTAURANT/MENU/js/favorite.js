console.log("Favourite JS loaded");

let favouriteButtons = document.querySelectorAll(".add-btn");

let cartData = JSON.parse(localStorage.getItem("cart")) || [];

favouriteButtons.forEach((button) => {

    button.addEventListener("click", () => {

        let card = button.closest(".favorites-grid-card");

        let foodName = card.querySelector("h3").innerText;

        let foodPrice = card
            .querySelector(".grid-card-price")
            .innerText
            .replace("₹", "");

        let price = Number(foodPrice);

        let image = "";

        switch (foodName.toLowerCase()) {

            case "burger":
            case "cheese burger":
                image = "../images/burger.jpg";
                break;

            case "pizza":
            case "margherita pizza":
                image = "../images/pizza.jpg";
                break;

            case "cake":
            case "chocolate cake":
                image = "../images/cake.jpg";
                break;

            case "noodles":
            case "veg noodles":
                image = "../images/noodles.jpg";
                break;

            default:
                image = "../images/food.png";
        }

        let existingFood = cartData.find(
            item => item.name === foodName
        );

        if (existingFood) {

            existingFood.quantity++;

        } else {

            cartData.push({

                id: Date.now(),

                name: foodName,

                price: price,

                quantity: 1,

                image: image

            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cartData)
        );

        alert(foodName + " added to cart 🛒");

    });

});