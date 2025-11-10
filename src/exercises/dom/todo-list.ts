/**
 * DOM API Exercise: Todo List
 * 
 * Task: Implement a simple todo list using DOM manipulation
 * 
 * Requirements:
 * - addTodo: Create a new list item with a delete button
 * - removeTodo: Remove a todo item from the list
 * - Use createElement, appendChild, addEventListener
 */

/**
 * Adds a new todo item to the list
 * @param text - The todo text
 */
export function addTodo(text: string): void {
  // TODO: Implement this function
  // Steps:
  // 1. Get the todo list element (id: "todo-list")
  // 2. Create a new <li> element
  // 3. Create a <span> for the text
  // 4. Create a <button> for delete action
  // 5. Add click event listener to the button to call removeTodo
  // 6. Append span and button to li
  // 7. Append li to the list
}

/**
 * Removes a todo item from the list
 * @param element - The todo item element to remove
 */
export function removeTodo(element: HTMLElement): void {
  // TODO: Implement this function
  // Hint: Use parentElement and removeChild or element.remove()
}

/**
 * Initializes the todo list with event listeners
 */
export function initTodoList(): void {
  const addButton = document.getElementById('add-todo-btn');
  const input = document.getElementById('todo-input') as HTMLInputElement;

  addButton?.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = ''; // Clear input after adding
    }
  });

  // Allow adding todo with Enter key
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
