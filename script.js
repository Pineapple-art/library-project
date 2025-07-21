
class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = !!read;

    this.info = function () {
      return (`${this.title} by ${this.author}, ${this.pages} pages`)
    }
  }

  toggleRead() {
    this.isRead = !this.isRead
  }
}

class Library {
  constructor(library = []) {
    this.library = library;
  }

  addBook(book) {
    this.library.push(book)
  }
  
  deleteBook(bookId) { // delete from array
    const index = this.library.findIndex((item) => bookId === item.id)
    if (index >= 0) {
      this.library.splice(index, 1)
    }
  }
}

class Display {

  static addBook(newBook) {
    const bookCard = document.createElement('li')
    const book = document.createElement('p')

    bookCard.setAttribute("data-book-id", newBook.id)
    book.textContent = newBook.info()
    bookCard.classList.add("content")

    bookList.appendChild(bookCard);
    bookCard.appendChild(book)
    this.#addDeleteBtn(bookCard)
    this.#addToggleBtn(bookCard, newBook.isRead)
  }

  static #addToggleBtn(bookCard, isRead) {
    const changeBtn = document.createElement('button')

    isRead ? changeBtn.textContent = "Read"
      : changeBtn.textContent = "Not read"

    changeBtn.classList.add("change")
    bookCard.appendChild(changeBtn);

    changeBtn.addEventListener("click", () => {
      const bookId = bookCard.getAttribute("data-book-id")
      const index = myLibrary.library.findIndex((item) => bookId === item.id)
      myLibrary.library[index].toggleRead()

      myLibrary.library[index].isRead ? changeBtn.textContent = "Read"
        : changeBtn.textContent = "Not read"
    })
  }

  static #addDeleteBtn(bookCard) {
    const deleteBtn = document.createElement('button')

    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete")
    bookCard.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", () => {
      const bookId = bookCard.getAttribute("data-book-id")
      const index = myLibrary.library.findIndex((item) => bookId === item.id)
      if (index >= 0) {
        myLibrary.library.splice(index, 1)
      }
      bookCard.remove();
    })

  }

}

const bookList = document.querySelector("ul");

let display = new Display()
let myLibrary = new Library();

(function() {
  const initBooks = [
    new Book("Pride and Prejudice", "Jane Austen", 338, true),
    new Book("Frankenstein", "Mary Shelley", 194, true),
    new Book("Harry Potter", "Joanne K. Rowling", 287, false),
    new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
  ]
  
  initBooks.forEach((item) => {
    myLibrary.addBook(item)
    Display.addBook(item)
  })
})()

// form to add books
const addBtn = document.querySelector("#id_add")
addBtn.addEventListener("click", addBookForm, false)

function addBookForm(event) {
  event.preventDefault();
  const title = document.querySelector("#book_title").value
  const author = document.querySelector("#book_author").value
  const pages = document.querySelector("#book_pages").value
  const isRead = document.querySelector("#is_read").value


  const newBook = new Book(title, author, pages, isRead)
  myLibrary.addBook(newBook) 
  Display.addBook(newBook)
}
