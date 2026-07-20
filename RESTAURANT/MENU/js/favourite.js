console.log("Favourite JS loaded");


let favouriteButtons = document.querySelectorAll(".add-btn");


let cartData = JSON.parse(localStorage.getItem("cart")) || [];



favouriteButtons.forEach((button)=>{


    button.addEventListener("click",()=>{


        let card = button.closest(".favorites-grid-card");


        let foodName = card.querySelector("h3").innerText;


        let foodPrice = card
            .querySelector(".grid-card-price")
            .innerText
            .replace("₹","");


        let price = Number(foodPrice);



        let existingFood = cartData.find(
            item => item.name === foodName
        );



        if(existingFood){

            existingFood.quantity += 1;

        }

        else{


            cartData.push({

                id: Date.now(),

                name: foodName,

                price: price,

                quantity: 1,

                image:"https://via.placeholder.com/300"

            });


        }



        localStorage.setItem(
            "cart",
            JSON.stringify(cartData)
        );



        alert(foodName + " added to cart 🛒");


    });


});