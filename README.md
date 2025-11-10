# Frontend Interview Boilerplate

A mentorship-focused boilerplate with exercises for JavaScript, TypeScript, and DOM API. Perfect for learning and practicing frontend development concepts.

## 🚀 Quick Start on StackBlitz

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Goreliy92/frontend-interview)

## 📦 Local Setup

1. Clone the repository:
```bash
git clone https://github.com/Goreliy92/frontend-interview.git
cd frontend-interview
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## 📚 Exercises

This boilerplate includes three starter exercises:

### 1. JavaScript Exercise: Array Sum
**File:** `src/exercises/javascript/array-sum.js`

Write a function that calculates the sum of all numbers in an array.

**Requirements:**
- Return 0 for an empty array
- Handle negative numbers
- Handle decimal numbers

### 2. TypeScript Exercise: User Validator
**File:** `src/exercises/typescript/user-validator.ts`

Define a User interface and implement a validation function.

**Requirements:**
- Define User interface with: name (string), age (number), email (string)
- Validate: name is not empty, age >= 18, email contains '@'

### 3. DOM API Exercise: Todo List
**File:** `src/exercises/dom/todo-list.ts`

Create a simple todo list with add and remove functionality.

**Requirements:**
- Implement `addTodo`: creates new todo item
- Implement `removeTodo`: removes a todo item
- Use DOM methods: createElement, appendChild, addEventListener

## 🎯 How to Use

1. Open a file in the `src/exercises/` directory
2. Read the task description in the comments
3. Implement the required functionality
4. Test your solution using the interactive interface in the browser
5. Check `src/exercises/solutions/` for reference implementations (if stuck)

## 📁 Project Structure

```
frontend-interview/
├── index.html              # Main HTML file
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── src/
│   ├── main.ts            # Main application logic
│   ├── style.css          # Styles
│   └── exercises/
│       ├── javascript/    # JavaScript exercises
│       ├── typescript/    # TypeScript exercises
│       ├── dom/          # DOM API exercises
│       └── solutions/    # Reference solutions
└── README.md
```

## 🛠️ Tech Stack

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Vanilla JS/TS** - No frameworks, pure web APIs

## 📝 Adding New Exercises

1. Create a new file in the appropriate `src/exercises/` subdirectory
2. Add the exercise description in comments
3. Update `src/main.ts` to include the new exercise
4. Add a new section in `index.html` if needed

## 🤝 Contributing

Feel free to add more exercises, improve existing ones, or enhance the UI!

## 📄 License

MIT