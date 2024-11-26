let total = 100; // Example total amount

function applyDiscount() {
    const discountCode = document.getElementById("discount-code").value;
    const validCodes = {
        "SAVE10": 10,    // 10% discount
        "SAVE20": 20,    // 20% discount
        "HALFOFF": 50    // 50% discount
    };

    if (validCodes[discountCode]) {
        const discount = validCodes[discountCode];
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountedTotal = total - (total * discount) / 100;

        document.getElementById("total-price").innerText = discountedTotal.toFixed(2);
        alert(`Discount applied! Your new total is $${discountedTotal.toFixed(2)}`);
    } else {
        alert("Invalid discount code.");
    }
}


document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Order placed successfully!");
    // Add logic to process order details (e.g., send to server).
});
document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Generate a unique Order ID
    const orderId = Date.now().toString(); // Example: timestamp as ID
    const orderStatus = "Processing"; // Initial status

    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create an order object
    const order = {
        id: orderId,
        status: orderStatus,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`Order placed successfully! Your Order ID is ${orderId}`);
    localStorage.removeItem("cart"); // Clear the cart
    location.href = "track-shipping.html"; // Redirect to track order page
});
