const myLibrary = []

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID()
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = !!read;
  
  this.info = function() {
    return(`${this.title} by ${this.author}, ${this.pages} pages`)
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
}

const ul = document.querySelector("ul");
const bookList = ul;

// A few books, so initial library is not empty
addBookToLibrary("Pride and Prejudice", "Jane Austen", 338, true);
addBookToLibrary("Frankenstein", "Mary Shelley", 194, true);
addBookToLibrary("Harry Potter", "Joanne K. Rowling", 287, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

function addBookToPage(item) {
  const bookCard = document.createElement('li')
  const book = document.createElement('p')

  bookCard.setAttribute("data-book-id", item.id)
  book.textContent = item.info()
  bookCard.classList.add("content")

  bookList.appendChild(bookCard);
  bookCard.appendChild(book)
  addButtons(bookCard, item.isRead)
}

function showLibrary(myLibrary) {
  
  myLibrary.forEach((item) => {
    addBookToPage(item)
  })
}

function addButtons(bookCard, isRead) {
  const changeBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')
  
  isRead ? changeBtn.textContent = "Read" 
    : changeBtn.textContent = "Not read"
  
  deleteBtn.textContent = "Delete"
  changeBtn.classList.add("change")
  deleteBtn.classList.add("delete")
  bookCard.appendChild(changeBtn);
  bookCard.appendChild(deleteBtn)
  
  deleteBtn.addEventListener("click", () => {
    const bookId = bookCard.getAttribute("data-book-id")
    const index = myLibrary.findIndex((item) => bookId === item.id)
    if (index >= 0) {
        myLibrary.splice(index, 1)
      }
      bookCard.remove();
  })

  changeBtn.addEventListener("click", () => {
    const bookId = bookCard.getAttribute("data-book-id")
    const index = myLibrary.findIndex((item) => bookId === item.id)
    myLibrary[index].toggleRead()
    myLibrary[index].isRead ? changeBtn.textContent = "Read" 
    : changeBtn.textContent = "Not read"
  })
}

showLibrary(myLibrary);

const addBtn = document.querySelector("#id_add")
addBtn.addEventListener("click", addBookForm, false)

function addBookForm(event) {
  event.preventDefault();
  const title = document.querySelector("#book_title").value
  const author = document.querySelector("#book_author").value
  const pages = document.querySelector("#book_pages").value
  const isRead = document.querySelector("#is_read").value

  addBookToLibrary(title, author, pages, isRead)
  addBookToPage(myLibrary[myLibrary.length-1]);
}

Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead
}