const books = JSON.parse(localStorage.getItem('books')) || [];
const form = document.querySelector('#form1');
const list = document.querySelector('#list');
let j = 1;

for (let i = 0; i < books.length; i += 1) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${books[i].title}<br>${books[i].author}<br>`;
  list.appendChild(listItem);
  // Create a Remove button for the new list item
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    // Renmove the corresponding data
    const index = books.indexOf(books[i]);
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    // Remove the corresponding list item from the HTML list
    list.removeChild(listItem);
  });
  const hr = document.createElement('hr');
  listItem.appendChild(removeButton);
  listItem.appendChild(hr);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');

  const formData = {
    id: j,
    title: title.value,
    author: author.value,
  };
  j += 1;
  books.push(formData);
  localStorage.setItem('books', JSON.stringify(books));
  title.value = '';
  author.value = '';

  // Add the new object to the HTML list
  const listItem = document.createElement('li');
  listItem.innerHTML = `${formData.title}<br>${formData.author}<br>`;
  list.appendChild(listItem);

  // Create a Remove button for the new list item
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    // Remove the corresponding data from the formDataArray and local storage
    const index = books.indexOf(formData);
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    // Remove the corresponding list item from the HTML list
    list.removeChild(listItem);
  });
  const hr = document.createElement('hr');
  listItem.appendChild(removeButton);
  listItem.appendChild(hr);
});