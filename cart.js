// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage or initialize as an empty array

// Function to add items to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in the cart
    } else {
        cart.push({ name, price, quantity: 1 }); // Add new item
    }
    saveCart(); // Save updated cart to localStorage
    alert(`${name} added to cart.`);
    updateCartCount(); // Update the cart count displayed
}

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

