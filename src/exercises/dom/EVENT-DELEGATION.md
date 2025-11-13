# Event Delegation Exercise

## 🎯 Objective
Learn and implement the **Event Delegation** pattern - a powerful DOM API technique for handling events efficiently.

## 📚 What is Event Delegation?

Event Delegation is a pattern where you attach a **single event listener** to a parent element instead of attaching individual listeners to multiple child elements. This takes advantage of event bubbling in the DOM.

### Traditional Approach (Not Recommended)
```javascript
// Adding individual listeners - inefficient
button1.addEventListener('click', handler);
button2.addEventListener('click', handler);
button3.addEventListener('click', handler);
// ... repeat for hundreds of buttons
```

### Event Delegation Approach (Recommended)
```javascript
// Single listener on parent - efficient
parentElement.addEventListener('click', (event) => {
  if (event.target.matches('button')) {
    handler(event);
  }
});
```

## 💡 Benefits

1. **Performance**: One listener vs many = less memory usage
2. **Dynamic Elements**: Works automatically with elements added later
3. **Cleaner Code**: Single handler instead of managing many
4. **Less Memory Leaks**: Fewer listeners to clean up

## 🔍 How Event Bubbling Works

```
<ul id="list">           ← 3. Event bubbles here (Event Delegation handles it here!)
  <li class="item">      ← 2. Event bubbles up
    <button>Delete</button>  ← 1. Click happens here
  </li>
</ul>
```

## 📋 Exercise Tasks

### 1. Basic Implementation
- [ ] Implement `addItem()` to create list items with edit/delete buttons
- [ ] Implement `removeItem()` to delete an item
- [ ] Implement `editItem()` to enable inline editing

### 2. Event Delegation Setup
- [ ] Implement `handleListClick()` to handle all button clicks
- [ ] Use `event.target` to identify clicked element
- [ ] Use `closest()` to find parent list item
- [ ] Use `data-action` attribute to determine action type

### 3. Initialize
- [ ] Implement `initEventDelegation()` to set up the single event listener
- [ ] Connect add button and input field

## 🔑 Key Concepts to Use

### 1. Event.target vs Event.currentTarget
```javascript
element.addEventListener('click', (event) => {
  event.target        // The actual element clicked
  event.currentTarget // The element with the listener (always 'element')
});
```

### 2. Element.closest()
```javascript
// Find nearest ancestor matching selector
const listItem = button.closest('li');
```

### 3. Element.matches()
```javascript
// Check if element matches selector
if (element.matches('button')) {
  // It's a button
}
```

### 4. data-* Attributes
```html
<button data-action="delete">Delete</button>
<button data-action="edit">Edit</button>
```
```javascript
const action = button.getAttribute('data-action');
```

## 🧪 Testing

Run the tests:
```bash
npm test event-delegation
```

Or test manually:
```bash
npm run dev
# Open event-delegation-demo.html
```

## 📝 Implementation Hints

### Step 1: Create Item Structure
```typescript
export function addItem(text: string): void {
  const list = document.getElementById('item-list');
  
  const li = document.createElement('li');
  li.className = 'item';
  
  const span = document.createElement('span');
  span.className = 'item-text';
  span.textContent = text;
  
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.setAttribute('data-action', 'edit');
  editBtn.textContent = 'Edit';
  
  // TODO: Create delete button
  // TODO: Append all elements
}
```

### Step 2: Handle Events with Delegation
```typescript
export function handleListClick(event: Event): void {
  const target = event.target as HTMLElement;
  
  // Find the button (if clicked element is within a button)
  const button = target.closest('button');
  if (!button) return;
  
  // Get the action
  const action = button.getAttribute('data-action');
  
  // Find parent list item
  const listItem = button.closest('li');
  if (!listItem) return;
  
  // Handle based on action
  switch (action) {
    case 'edit':
      // TODO: Call editItem
      break;
    case 'delete':
      // TODO: Call removeItem
      break;
  }
}
```

### Step 3: Set Up Delegation
```typescript
export function initEventDelegation(): void {
  const list = document.getElementById('item-list');
  
  // Single listener for all clicks on list items
  list?.addEventListener('click', handleListClick);
  
  // TODO: Set up add button handler
}
```

## 🎨 Visual Demo

Open `event-delegation-demo.html` in your browser to see a fully styled, interactive demo of the exercise.

## 📖 Additional Resources

- [MDN: Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
- [JavaScript.info: Event Delegation](https://javascript.info/event-delegation)
- [Event Bubbling and Capturing](https://javascript.info/bubbling-and-capturing)

## 🎯 Real-World Use Cases

1. **Large Lists**: E-commerce product lists with many items
2. **Comment Sections**: Social media comments with like/reply buttons
3. **Data Tables**: Tables with actions on each row
4. **Dynamic Content**: Chat applications, infinite scroll
5. **Form Validation**: Multiple form fields with validation

## ✅ Success Criteria

Your implementation should:
- ✅ Use only ONE event listener on the parent `<ul>`
- ✅ Handle clicks on edit and delete buttons correctly
- ✅ Work with dynamically added items (no re-attaching listeners)
- ✅ Pass all unit tests
- ✅ Follow best practices for event delegation

## 🚀 Bonus Challenges

1. Add keyboard support (Delete key to remove selected item)
2. Add drag-and-drop reordering using event delegation
3. Track and log performance differences vs individual listeners
4. Add support for nested lists with delegation
5. Implement undo/redo functionality

## 📚 Related Exercises

- **Todo List** (`todo-list.ts`) - Basic DOM manipulation
- **Debounce** (`debounce.js`) - Another performance pattern
- **Throttle** (`throttle.js`) - Rate limiting for events

---

Good luck! Remember: One listener to rule them all! 🧙‍♂️
