document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const totalPriceSpan = document.getElementById("total-price");

    // Sample item data (you can replace this with your data)
    const items = [
        { name: "Item 1", price: 10.00, quantity: 2, liked: false },
        { name: "Item 2", price: 15.00, quantity: 1, liked: false },
    ];

    // Function to update the cart UI
    function updateCartUI() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        items.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");

            const itemName = document.createElement("span");
            itemName.textContent = item.name;

            const itemQuantity = document.createElement("span");
            itemQuantity.textContent = `Quantity: ${item.quantity}`;

            const itemPrice = document.createElement("span");
            itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

            const likeButton = document.createElement("span");
            likeButton.classList.add("like-button");
            likeButton.innerHTML = "&#10084;";
            if (item.liked) {
                likeButton.classList.add("liked");
            }

            // Add event listeners for +, -, and like buttons
            const increaseQuantityButton = document.createElement("button");
            increaseQuantityButton.textContent = "+";
            increaseQuantityButton.addEventListener("click", () => {
                items[index].quantity++;
                updateCartUI();
            });

            const decreaseQuantityButton = document.createElement("button");
            decreaseQuantityButton.textContent = "-";
            decreaseQuantityButton.addEventListener("click", () => {
                if (items[index].quantity > 1) {
                    items[index].quantity--;
                }
                updateCartUI();
            });

            likeButton.addEventListener("click", () => {
                items[index].liked = !items[index].liked;
                updateCartUI();
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                items.splice(index, 1);
                updateCartUI();
            });

            cartItem.appendChild(itemName);
            cartItem.appendChild(itemQuantity);
            cartItem.appendChild(increaseQuantityButton);
            cartItem.appendChild(decreaseQuantityButton);
            cartItem.appendChild(likeButton);
            cartItem.appendChild(itemPrice);
            cartItem.appendChild(deleteButton);

            cartItems.appendChild(cartItem);

            totalPrice += item.price * item.quantity;
        });

        totalPriceSpan.textContent = totalPrice.toFixed(2);
    }

    // Initial cart UI setup
    updateCartUI();
});
