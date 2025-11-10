import './style.css';
import { sumArray } from './exercises/javascript/array-sum.js';
import { isValidUser, type User } from './exercises/typescript/user-validator';
import { initTodoList } from './exercises/dom/todo-list';

// Navigation between exercises
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const exerciseSections = document.querySelectorAll('.exercise-section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const exerciseId = button.getAttribute('data-exercise');
      
      // Update active button
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show corresponding exercise
      exerciseSections.forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(`${exerciseId}-exercise`)?.classList.add('active');
    });
  });

  // JavaScript Exercise Test
  const jsTestBtn = document.getElementById('js-test-btn');
  const jsInput = document.getElementById('js-input') as HTMLInputElement;
  const jsResult = document.getElementById('js-result');

  jsTestBtn?.addEventListener('click', () => {
    const input = jsInput.value.trim();
    if (!input) {
      showResult(jsResult, 'Please enter some numbers!', 'error');
      return;
    }

    try {
      const numbers = input.split(',').map(n => parseFloat(n.trim()));
      if (numbers.some(isNaN)) {
        showResult(jsResult, 'Please enter valid numbers!', 'error');
        return;
      }

      const result = sumArray(numbers);
      showResult(jsResult, `Sum: ${result}`, 'success');
    } catch (error) {
      showResult(jsResult, `Error: ${(error as Error).message}`, 'error');
    }
  });

  // TypeScript Exercise Test
  const tsTestBtn = document.getElementById('ts-test-btn');
  const tsName = document.getElementById('ts-name') as HTMLInputElement;
  const tsAge = document.getElementById('ts-age') as HTMLInputElement;
  const tsEmail = document.getElementById('ts-email') as HTMLInputElement;
  const tsResult = document.getElementById('ts-result');

  tsTestBtn?.addEventListener('click', () => {
    const user: User = {
      name: tsName.value.trim(),
      age: parseInt(tsAge.value),
      email: tsEmail.value.trim()
    };

    try {
      const isValid = isValidUser(user);
      if (isValid) {
        showResult(tsResult, '✓ Valid user!', 'success');
      } else {
        showResult(tsResult, '✗ Invalid user! Check: name not empty, age >= 18, email contains @', 'error');
      }
    } catch (error) {
      showResult(tsResult, `Error: ${(error as Error).message}`, 'error');
    }
  });

  // DOM API Exercise
  initTodoList();
});

// Helper function to show results
function showResult(element: HTMLElement | null, message: string, type: 'success' | 'error' | 'info') {
  if (!element) return;
  
  element.textContent = message;
  element.className = `result show ${type}`;
  
  // Hide after 5 seconds
  setTimeout(() => {
    element.classList.remove('show');
  }, 5000);
}
