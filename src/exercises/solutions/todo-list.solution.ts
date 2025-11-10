/**
 * Solution: Todo List
 */

export function addTodo(text: string): void {
  const todoList = document.getElementById('todo-list');
  if (!todoList) return;

  // Create list item
  const li = document.createElement('li');
  
  // Create text span
  const span = document.createElement('span');
  span.textContent = text;
  
  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    removeTodo(li);
  });
  
  // Append elements
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

export function removeTodo(element: HTMLElement): void {
  element.remove();
}

export function initTodoList(): void {
  const addButton = document.getElementById('add-todo-btn');
  const input = document.getElementById('todo-input') as HTMLInputElement;

  addButton?.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = '';
    }
  });

  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const text = input.value.trim();
      if (text) {
        addTodo(text);
        input.value = '';
      }
    }
  });
}
