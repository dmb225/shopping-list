const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM((item)));
  cleanUI();
}

function onAddItemSubmit(e) {
  // prevent the browser to submit the form to the server
  e.preventDefault();

  const item = itemInput.value;
  // validate input
  if (item === '') {
    alert('Please add an item');
    return;
  }

  // check edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  }

  if (doesItemExist(item)) {
    alert("This item already exists!");
    return;
  }

  addItemToDOM(item);
  addItemToStorage(item);

  cleanUI();
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function doesItemExist(item) {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  // remove edit mode for all items
  itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

  isEditMode = true;
  item.classList.add('edit-mode');
  itemInput.value = item.textContent;
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
  formBtn.style.backgroundColor = '#228B22';
}

function removeItem(item) {
  if (confirm('Are you sure want to remove this item')) {
    item.remove();
    removeItemFromStorage(item.textContent);
    cleanUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage().filter(i => i !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAllItems() {
  if (confirm('Are you sure want to remove all items')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem('items');

    cleanUI();
  }
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function cleanUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  isEditMode = false;
  itemInput.value = '';
  formBtn.innerHTML = '<i class="fa-solid da-plus"></i> Add Item';
  formBtn.backgroundColor = '#333';
}

function addItemToDOM(item) {
  // create & add list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  li.appendChild(createButton('remove-item btn-link text-red'));
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
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

function init() {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', removeAllItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  cleanUI();
}

init();
