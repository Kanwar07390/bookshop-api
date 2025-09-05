const express = require("express");
const app = express();

app.use(express.json()); // to parse JSON bodies

// Sample data
let users = []; // store registered users
let books = {
  "12345": {
    title: "Book One",
    author: "Author A",
    reviews: {}
  },
  "67890": {
    title: "Book Two",
    author: "Author B",
    reviews: {}
  }
};

/* --------------------- GENERAL USERS ---------------------- */

// Task 1: Get all books
app.get("/", (req, res) => {
  res.json(books); // books should be your in-memory object with ISBN, title, author, reviews
});


// Task 2: Get books based on ISBN
app.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = books[isbn];
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Get all books by Author
app.get("/author/:author", (req, res) => {
  const author = req.params.author;
  let result = {};
  for (let isbn in books) {
    if (books[isbn].author === author) {
      result[isbn] = books[isbn];
    }
  }
  res.json(result);
});

// Task 4: Get all books by Title
app.get("/title/:title", (req, res) => {
  const title = req.params.title;
  let result = {};
  for (let isbn in books) {
    if (books[isbn].title === title) {
      result[isbn] = books[isbn];
    }
  }
  res.json(result);
});

// Task 5: Get book review
app.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = books[isbn];
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/* --------------------- USER AUTH ---------------------- */

// Task 6: Register New user
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  let userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  res.json({ message: "User registered successfully" });
});

// Task 7: Login as Registered user
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

/* --------------------- REGISTERED USERS ---------------------- */

// Task 8: Add or modify a review
app.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const { username, review } = req.body;

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!review) {
        return res.status(400).json({ message: "Review text is required" });
    }

    // Initialize reviews if not present
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    // Add/Update review
    books[isbn].reviews[username] = review;

    res.json({
        message: "Review added/updated successfully",
        reviews: books[isbn].reviews
    });
});



// Task 9: Delete a review
app.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const { username } = req.body;

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "Review not found for this user" });
    }

    // Delete review
    delete books[isbn].reviews[username];

    res.json({
        message: "Review deleted successfully",
        reviews: books[isbn].reviews
    });
});


/* --------------------- START SERVER ---------------------- */
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
