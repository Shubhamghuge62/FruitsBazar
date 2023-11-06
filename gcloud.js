const mysql = require('mysql');

function storeCartItemsOrganica() {
    // Create a MySQL database connection
    const connection = mysql.createConnection({
        host: '34.69.51.10',
        user: 'meet_shrimankar',
        password: '1234', // Replace with your actual password
        database: 'Organica'
        
    });

    // Connect to the MySQL database
    connection.connect((err) => {
        fetch("https://us-central1-organica-403517.cloudfunctions.net/store_cart_items_organica_web");
        if (err) {
            console.error('Error connecting to the database: ' + err.stack);
            return;
        }

        console.log('Connected to the database');
    });

    // Prepare the SQL query to insert the cart items
    const sql = `
        INSERT INTO cart_items (product_items, product_name, price, product_image)
        VALUES (?, ?, ?, ?)
    `;

    // Execute the SQL query
    connection.query(sql, [cartItems.product_items, cartItems.product_name, cartItems.price, cartItems.product_image], (err, results) => {
        if (err) {
            console.error('Error executing the SQL query: ' + err.message);
        } else {
            console.log('Cart items stored successfully');
        }

        // Close the connection to the database
        connection.end((endErr) => {
            if (endErr) {
                console.error('Error closing the database connection: ' + endErr.message);
            }
        });
    });
}

// Example usage:
const cartItem = {
    product_items: product_items,
    product_name: product_name,
    price: product_price,
    product_image: product_image
};

// Call the function when a button is clicked, passing the cart item as an argument
document.getElementById('yourButtonId').addEventListener('click', () => {
    storeCartItemsOrganica(cartItem);
});
