const myLibrary = []

class Book {
  constructor(title, author, pages, read, myLibrary) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = !!read;

    this.info = function () {
      return (`${this.title} by ${this.author}, ${this.pages} pages`)
    }
  }

  addBookToLibrary(myLibrary) {
    myLibrary.push(this)
  }

  addBookToPage() {
    const bookCard = document.createElement('li')
    const book = document.createElement('p')

    bookCard.setAttribute("data-book-id", this.id)
    book.textContent = this.info()
    bookCard.classList.add("content")

    bookList.appendChild(bookCard);
    bookCard.appendChild(book)
    this.addToggleBtn(bookCard)
    this.addDeleteBtn(bookCard)
  }

  addDeleteBtn(bookCard) {
    const deleteBtn = document.createElement('button')

    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete")
    bookCard.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", () => {
      const bookId = bookCard.getAttribute("data-book-id")
      const index = myLibrary.findIndex((item) => bookId === item.id)
      if (index >= 0) {
        myLibrary.splice(index, 1)
      }
      bookCard.remove();
    })

  }

  addToggleBtn(bookCard) {
    const changeBtn = document.createElement('button')

    this.isRead ? changeBtn.textContent = "Read New"
      : changeBtn.textContent = "Not read New"

    changeBtn.classList.add("change")
    bookCard.appendChild(changeBtn);

    changeBtn.addEventListener("click", () => {
      const bookId = bookCard.getAttribute("data-book-id")
      const index = myLibrary.findIndex((item) => bookId === item.id)
      this.toggleRead()
      this.isRead ? changeBtn.textContent = "Read"
        : changeBtn.textContent = "Not read"
    })
  }

  toggleRead() {
    this.isRead = !this.isRead
  }
}


const ul = document.querySelector("ul");
const bookList = ul;


myLibrary[0] = new Book("Pride and Prejudice", "Jane Austen", 338, true)
myLibrary[1] = new Book("Frankenstein", "Mary Shelley", 194, true)
myLibrary[2] = new Book("Harry Potter", "Joanne K. Rowling", 287, false)
myLibrary[3] = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)


function showLibrary(myLibrary) {
  myLibrary.forEach((item) => {
    item.addBookToPage()
  })
}

showLibrary(myLibrary);

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
  newBook.addBookToLibrary(myLibrary)
  newBook.addBookToPage()
}
