const axios = require("axios");

// Task 10: Get all books (Async/Await)
async function getAllBooks() {
  try {
    const res = await axios.get("http://localhost:5000/");
    console.log("Task 10: All Books:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// Task 11: Search by ISBN (Promises)
function getBookByISBN(isbn) {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(res => console.log("Task 11: Book by ISBN:", res.data))
    .catch(err => console.error(err.message));
}

// Task 12: Search by Author (Async/Await)
async function getBooksByAuthor(author) {
  try {
    const res = await axios.get(`http://localhost:5000/author/${author}`);
    console.log("Task 12: Books by Author:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// Task 13: Search by Title (Async/Await)
async function getBooksByTitle(title) {
  try {
    const res = await axios.get(`http://localhost:5000/title/${title}`);
    console.log("Task 13: Books by Title:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// Run tasks
getAllBooks();
getBookByISBN("12345");
getBooksByAuthor("Author A");
getBooksByTitle("Book One");
