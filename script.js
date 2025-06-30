const myLibrary = []

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID()
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    // return(this.title + " by " + this.author + ", " + this.pages + ", " + this.read)
    return(`${this.title} by ${this.author}, ${this.pages}, ${this.read}`)
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
}

const ul = document.querySelector("ul");
const bookList = ul;


// A few book, so initial library is not empty
addBookToLibrary("Pride and Prejudice", "Jane Austen", 338, "read")
addBookToLibrary("Frankenstein", "Mary Shelley", 194, "read")
addBookToLibrary("Harry Potter", "Joanne K. Rowling", 287, "read")
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
myLibrary.forEach((item) => {
  const book = document.createElement('li');
  book.textContent = item.info();
  book.classList.add("content")
  bookList.appendChild(book);
})


function addBookToPage() {
  const book = document.createElement('li');
  book.textContent = myLibrary[myLibrary.length-1].info();
  book.classList.add("content")
  bookList.appendChild(book);
}

const addBtn = document.querySelector("#id_add")
addBtn.addEventListener("click", addBookForm, false)

function addBookForm(event) {
  event.preventDefault();
  const title = document.querySelector("#book_title").value
  const author = document.querySelector("#book_author").value
  const pages = document.querySelector("#book_pages").value
  const isRead = document.querySelector("#is_read").value

  addBookToLibrary(title, author, pages, isRead)
  addBookToPage();
}




// const testBook = document.createElement('li');
// testBook.textContent = "I'm a new book!"
// bookList.appendChild(testBook)

