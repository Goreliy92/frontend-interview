/**
 * Solution: Event Delegation
 */

export function addItem(text: string): void {
  const list = document.getElementById('item-list');
  if (!list) return;

  const li = document.createElement('li');
  li.className = 'item';
  
  const span = document.createElement('span');
  span.className = 'item-text';
  span.textContent = text;
  
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = 'Edit';
  editBtn.setAttribute('data-action', 'edit');
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('data-action', 'delete');
  
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

export function editItem(itemElement: HTMLElement): void {
  const textSpan = itemElement.querySelector('.item-text') as HTMLElement;
  if (!textSpan) return;
  
  const currentText = textSpan.textContent || '';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'item-edit-input';
  
  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText) {
      textSpan.textContent = newText;
      itemElement.replaceChild(textSpan, input);
    } else {
      // If empty, restore original text
      itemElement.replaceChild(textSpan, input);
    }
  };
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  });
  
  input.addEventListener('blur', saveEdit);
  
  itemElement.replaceChild(input, textSpan);
  input.focus();
}

export function removeItem(itemElement: HTMLElement): void {
  itemElement.remove();
}

export function handleListClick(event: Event): void {
  const target = event.target as HTMLElement;
  
  // Check if the clicked element is a button or within a button
  const button = target.closest('button');
  if (!button) return;
  
  const action = button.getAttribute('data-action');
  const listItem = button.closest('li');
  
  if (!listItem || !action) return;
  
  switch (action) {
    case 'edit':
      editItem(listItem as HTMLElement);
      break;
    case 'delete':
      removeItem(listItem as HTMLElement);
      break;
  }
}

export function initEventDelegation(): void {
  const list = document.getElementById('item-list');
  const addButton = document.getElementById('add-item-btn');
  const input = document.getElementById('item-input') as HTMLInputElement;
  
  // Single event listener on the parent (event delegation)
  list?.addEventListener('click', handleListClick);
  
  // Add new item
  const addNewItem = () => {
    const text = input?.value.trim();
    if (text) {
      addItem(text);
      if (input) input.value = '';
    }
  };
  
  addButton?.addEventListener('click', addNewItem);
  
  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addNewItem();
    }
  });
}

export function getItemCount(): number {
  const list = document.getElementById('item-list');
  return list?.children.length || 0;
}

export function clearAllItems(): void {
  const list = document.getElementById('item-list');
  if (list) {
    list.innerHTML = '';
  }
}
