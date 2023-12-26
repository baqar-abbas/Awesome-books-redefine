class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static add(book) {
    const books = Book.getAll();
    book.id = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static remove(id) {
    const books = Book.getAll();
    const index = books.findIndex((book) => book.id === id);
    if (index >= 0) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
    return books;
  }

  static getAll() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }

  static displayAll() {
    const books = Book.getAll();
    const list = document.querySelector('#list');
    list.innerHTML = '';
    books.forEach((book) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `"${book.title}" by ${book.author}`;
      // Create a Remove button for the new list item
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        Book.remove(book.id);
        list.removeChild(listItem);
      });
      listItem.appendChild(removeButton);
      list.appendChild(listItem);
    });
  }
}

window.onload = Book.displayAll();

const form = document.querySelector('#form1');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');

  const book = new Book(title.value, author.value);
  Book.add(book);
  title.value = '';
  author.value = '';
  Book.displayAll();
});

const listButton = document.querySelector('.list');
const addNewButton = document.querySelector('.add-new');
const listSection = document.querySelector('.list-section');
const addSection = document.querySelector('.add-books');
const contactButton = document.querySelector('.contact');
const contactSection = document.querySelector('.contact-section');

listButton.addEventListener('click', () => {
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
  listSection.style.display = 'flex';
});

addNewButton.addEventListener('click', (e) => {
  e.preventDefault();
  addSection.style.display = 'block';
  contactSection.style.display = 'none';
  listSection.style.display = 'none';
});

contactButton.addEventListener('click', () => {
  addSection.style.display = 'none';
  listSection.style.display = 'none';
  contactSection.style.display = 'flex';
});

function time() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  const date = now.toLocaleDateString('en-US', options);

  document.getElementById('datetime').textContent = `${date} ${hours}:${minutes}:${seconds}`;
}
setInterval(time, 1000);
