const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  // prevent the browser to submit the form to the server
  e.preventDefault();

  const item = itemInput.value;
  // validate input
  if (item === '') {
    alert('Please add an item');
    return;
  }

  // create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  li.appendChild(createButton('remove-item btn-link text-red'));
  itemList.appendChild(li);

  // clean input
  itemInput.value = '';
}


function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  button.appendChild(createIcon('fa-solid fa-xmark'))

  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;

  return icon;
}

itemForm.addEventListener('submit', addItem);
