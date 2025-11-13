/**
 * DOM API Exercise: Event Delegation
 * 
 * Task: Implement event delegation pattern for dynamic list items
 * 
 * Requirements:
 * - Use a single event listener on the parent instead of many on children
 * - Handle clicks on dynamically added items
 * - Distinguish between different button types (edit, delete)
 * - Improve performance compared to individual listeners
 * 
 * Event Delegation Benefits:
 * - Better performance (one listener vs many)
 * - Works with dynamically added elements
 * - Less memory usage
 * - Cleaner code
 */

/**
 * Adds a new item to the list
 * Each item has text, an edit button, and a delete button
 * @param text - The item text
 */
export function addItem(text: string): void {
  // TODO: Implement this function
  // Steps:
  // 1. Get the item list element (id: "item-list")
  // 2. Create a new <li> element with class "item"
  // 3. Create a <span> with class "item-text" for the text
  // 4. Create an edit button with class "edit-btn" and data-action="edit"
  // 5. Create a delete button with class "delete-btn" and data-action="delete"
  // 6. Append all elements and add to the list
  // 7. DO NOT add individual click listeners to buttons
}

/**
 * Edits an item by replacing its text with an input field
 * @param itemElement - The list item element
 */
export function editItem(itemElement: HTMLElement): void {
  // TODO: Implement this function
  // Steps:
  // 1. Find the span with class "item-text" in the item
  // 2. Get current text
  // 3. Replace span with an input field containing the current text
  // 4. Focus the input
  // 5. Listen for Enter key or blur to save changes
  // 6. On save, replace input with span containing new text
}

/**
 * Removes an item from the list
 * @param itemElement - The list item element to remove
 */
export function removeItem(itemElement: HTMLElement): void {
  // TODO: Implement this function
  // Hint: Use element.remove()
}

/**
 * Handles click events using event delegation
 * @param event - The click event
 */
export function handleListClick(event: Event): void {
  // TODO: Implement this function
  // Steps:
  // 1. Get the event target
  // 2. Check if target is a button (use closest() or matches())
  // 3. Get the data-action attribute
  // 4. Find the parent list item
  // 5. Call appropriate function based on action:
  //    - "edit" -> editItem()
  //    - "delete" -> removeItem()
  
  // Hints:
  // - Use (event.target as HTMLElement)
  // - Use element.closest('li') to find parent item
  // - Use element.getAttribute('data-action')
}

/**
 * Initializes the event delegation pattern
 * Sets up a single event listener on the parent container
 */
export function initEventDelegation(): void {
  // TODO: Implement this function
  // Steps:
  // 1. Get the list element (id: "item-list")
  // 2. Add a single click event listener to the list
  // 3. The listener should call handleListClick
  // 4. Get the add button and input field
  // 5. Set up listener to add new items
  
  // Example structure:
  // const list = document.getElementById('item-list');
  // list?.addEventListener('click', handleListClick);
}

/**
 * Gets the count of items in the list
 * Useful for testing
 */
export function getItemCount(): number {
  const list = document.getElementById('item-list');
  return list?.children.length || 0;
}

/**
 * Clears all items from the list
 * Useful for testing
 */
export function clearAllItems(): void {
  const list = document.getElementById('item-list');
  if (list) {
    list.innerHTML = '';
  }
}
