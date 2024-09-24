const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addItem(e) {
  // prevent the browser to submit the form to the server
  e.preventDefault();

  const item = itemInput.value;
  // validate input
  if (item === '') {
    alert('Please add an item');
    return;
  }

  // create & add list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  li.appendChild(createButton('remove-item btn-link text-red'));
  itemList.appendChild(li);

  // clean input
  itemInput.value = '';

  cleanUI();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure want to remove this item')) {
      e.target.parentElement.parentElement.remove();
      cleanUI();
    }
  }
}

function removeAllItems() {
  if (confirm('Are you sure want to remove all items')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
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
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItems);
itemFilter.addEventListener('input', filterItems);

cleanUI();
