// Initialize the cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.dataset.id;
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            // Increment quantity if the item exists
            existingItem.quantity += 1;
        } else {
            // Add new item to the cart
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${productName} has been added to your cart!`);
    });
});

// Display the cart on the cart page
if (document.getElementById('cart-container')) {
    function displayCart() {
        const cartTableBody = document.querySelector('#cart-table tbody');
        const cartTotal = document.getElementById('cart-total');
        cartTableBody.innerHTML = ''; // Clear existing rows
        let total = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.dataset.id;
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCart(); // Refresh the cart
            });
        });
    }

    // Display the cart initially
    displayCart();
}
