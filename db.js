const express = require("express");
let cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise"); // Using the mysql2/promise library for async/await support

const app = express();
const port = 3000;
const url = 'https://us-central1-organica-403517.cloudfunctions.net/store_cart_items_organica_web'
// Middleware
app.use(cors());
app.use(bodyParser.json());
// MySQL database configuration
const dbConfig = {
  host: "34.69.51.10",
  user: "root",
  password: "",
  database: "ecommerce",
};

// Create a pool of database connections
const pool = mysql.createPool(dbConfig);
// Routes for CRUD operations

// Create New User(POST)
app.post("/api/post", async (req, res) => {
  // const id = 101;
  const uname = req.body.uname;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const pnum = req.body.pnum;
  const address = req.body.address;
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (user_name, user_firstname, user_lastname, user_email, user_password, user_mobile, user_address) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [uname, fname, lname, email, password, pnum, address]
    );
    res.json({ message: "success" });
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: error });
    res.json({ message: "error" });
  }
});

// Read (GET products)
app.get("/api/products", async (req, res) => {
  try {
    const [results] = await pool.execute("SELECT * FROM products");
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// Read (GET single product)
app.get("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.execute(
      "SELECT * FROM products where pdt_id=?",
      [id]
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// Read (GET slider)
app.get("/api/slider", async (req, res) => {
  try {
    const [results] = await pool.execute("SELECT * FROM slider");
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// Read (GET banner)
app.get("/api/banner", async (req, res) => {
  try {
    const [results] = await pool.execute(
      "SELECT * FROM products where pdt_ctg=1"
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// Read (GET product)
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.execute(
      "SELECT * FROM products where pdt_ctg=?",
      [id]
    );
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// Update (PUT)
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await pool.execute("UPDATE products SET name = ? WHERE id = ?", [name, id]);
    res.json({ id, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// Delete (DELETE)
app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM items WHERE id = ?", [id]);
    res.json({ message: "Item deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// Handle the login form submission
app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  try {
    const [result] = await pool.execute(
      "SELECT user_name, user_email, user_password from users where user_email=?",
      [email]
    );
    if (result.length == 0) {
      res.json({ message: "error" });
    } else {
      res.json({ password:result[0].user_password, message: "success",  });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// ...

// Add product details to the database
// app.post("/api/addtocart", async (req, res) => {
//   const product_id = req.body.product_id;
//   const product_name = req.body.product_name;
//   const price = req.body.price;

//   try {
//     await pool.execute(
//       "INSERT INTO cart_items (product_id, product_name, price) VALUES (?, ?, ?)",
//       [product_id, product_name, price]
//     );
//     res.json({ message: "Item added to the cart" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred." });
//   }
// });

app.post("/api/addtocart", async (req, res) => {
  const product_id = req.body.product_id;
  const product_name = req.body.product_name;
  const price = req.body.price;
  const product_image = req.body.product_image;
  try {
    await pool.execute(
      "INSERT INTO cart_items (product_id, product_name, price, product_image) VALUES (?, ?, ?, ?)",
      [product_id, product_name, price, product_image]
    );
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});



// ...


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
