// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage or initialize as an empty array

// Function to add items to the cart
<script>
    function addToCart(productName, productPrice) {
        // Create a product object
        const product = {
            name: productName,
            price: productPrice,
            quantity: 1
        };

        // Get the current cart from local storage or create a new one
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex > -1) {
            // If the product exists, increase the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If the product does not exist, add it to the cart
            cart.push(product);
        }

        // Save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Alert the user that the specific product has been added
        alert(`${productName} has been added to your cart!`);

        // Redirect to the checkout page
        window.location.href = "checkout.html"; // Change this to your actual checkout page URL
    }
</script>

// Function to update cart item count display
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    cartCount.innerText = totalItems;
}

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Attach event listeners to "Buy Now" buttons
document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        addToCart(name, price); // Add the selected item to the cart
    });
});

// Update cart count on page load
updateCartCount();

