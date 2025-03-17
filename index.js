const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];


app.get("/whoami", (req, res) => {
res.json({ studentNumber: "2540532" }); 
});
app.get("/books", (req, res) => {
res.json(books);
});


app.get("/books/:id", (req, res) => {
const book = books.find(b => b.id === req.params.id);
if (!book) {
return res.status(404).json({ error: "404 Not Found" });
}
res.json(book);
});


app.post("/books", (req, res) => {
const { id, title, details } = req.body;

if (!id || !title || !Array.isArray(details)) {
return res.status(400).json({ error: "400 Bad Request" });
}

const newBook = { id, title, details };
books.push(newBook);
res.status(201).json(newBook);
});


app.put("/books/:id", (req, res) => {
const book = books.find(b => b.id === req.params.id);
if (!book) {
return res.status(404).json({ error: "404 Not Found" });
}

const { title } = req.body;
if (title) book.title = title;

res.json(book);
});


app.delete("/books/:id", (req, res) => {
const bookIndex = books.findIndex(b => b.id === req.params.id);
if (bookIndex === -1) {
return res.status(404).json({ error: "404 Not Found" });
}

books.splice(bookIndex, 1);
res.json({ message: "Book deleted successfully" });
});


app.post("/books/:id/details", (req, res) => {
const book = books.find(b => b.id === req.params.id);
if (!book) {
return res.status(404).json({ error: "404 Not Found" });
}

const { id, author, genre, publicationYear } = req.body;
if (!id || !author || !genre || !publicationYear) {
}

book.details.push({ id, author, genre, publicationYear });
res.json(book);
});


app.delete("/books/:id/details/:detailId", (req, res) => {
const book = books.find(b => b.id === req.params.id);
if (!book) {
return res.status(404).json({ error: "404 Not Found" });
}

const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
if (detailIndex === -1) {
return res.status(404).json({ error: "404 Not Found" });
}

book.details.splice(detailIndex, 1);
res.json({ message: "Detail removed successfully" });
});


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});