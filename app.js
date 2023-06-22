// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//  UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    // const StoreBooks = [
    //   {
    //     title: "Book One",
    //     author: "John Doe",
    //     isbn: "1234553",
    //   },
    //   {
    //     title: "Book Two",
    //     author: "Tom Doe",
    //     isbn: "1234553",
    //   },
    // ];

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, classNane) {
    const div = document.createElement("div");
    div.className = `alert alert-${classNane}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // Vanish in 3s
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event:Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //  Prevent actual submit
  e.preventDefault();

  // Get from values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //   Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger text-danger fw-bold");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    //   Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book Added", "success fw-bold text-success");

    //   Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  //   Remove book from store
  // Store.removeBook(e.target.parentElement.previousElementSibling.textCont);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show remove message
  UI.showAlert("Book remove", "danger fs-5 fw-bold text-danger");
});
