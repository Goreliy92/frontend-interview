/**
 * Tests for Todo List Exercise
 * 
 * Tests basic DOM manipulation: createElement, appendChild, addEventListener, element.remove()
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addTodo, removeTodo, initTodoList } from './todo-list';

describe('Todo List', () => {
  beforeEach(() => {
    // Setup DOM structure before each test
    document.body.innerHTML = `
      <div>
        <input type="text" id="todo-input" />
        <button id="add-todo-btn">Add Todo</button>
        <ul id="todo-list"></ul>
      </div>
    `;
  });

  describe('addTodo', () => {
    it('should add a todo item to the list', () => {
      addTodo('Buy groceries');
      
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(1);
    });

    it('should create a list item with text', () => {
      const todoText = 'Complete homework';
      addTodo(todoText);
      
      const todoList = document.getElementById('todo-list');
      const firstItem = todoList?.firstElementChild;
      
      expect(firstItem?.tagName).toBe('LI');
      expect(firstItem?.textContent).toContain(todoText);
    });

    it('should create a span element for the text', () => {
      addTodo('Write tests');
      
      const todoList = document.getElementById('todo-list');
      const firstItem = todoList?.firstElementChild;
      const span = firstItem?.querySelector('span');
      
      expect(span).toBeTruthy();
      expect(span?.textContent).toBe('Write tests');
    });

    it('should create a delete button', () => {
      addTodo('Test todo');
      
      const todoList = document.getElementById('todo-list');
      const firstItem = todoList?.firstElementChild;
      const button = firstItem?.querySelector('button');
      
      expect(button).toBeTruthy();
      expect(button?.textContent).toContain('Delete');
    });

    it('should add multiple todos', () => {
      addTodo('First todo');
      addTodo('Second todo');
      addTodo('Third todo');
      
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(3);
    });

    it('should preserve order of todos', () => {
      const todos = ['First', 'Second', 'Third'];
      todos.forEach(todo => addTodo(todo));
      
      const todoList = document.getElementById('todo-list');
      const items = Array.from(todoList?.children || []);
      
      items.forEach((item, index) => {
        const span = item.querySelector('span');
        expect(span?.textContent).toBe(todos[index]);
      });
    });

    it('should handle empty todo list initially', () => {
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(0);
      
      addTodo('First todo');
      expect(todoList?.children.length).toBe(1);
    });

    it('should handle special characters in todo text', () => {
      const specialText = 'Todo with <special> & "characters"';
      addTodo(specialText);
      
      const todoList = document.getElementById('todo-list');
      const span = todoList?.querySelector('span');
      expect(span?.textContent).toBe(specialText);
    });

    it('should handle long todo text', () => {
      const longText = 'A'.repeat(500);
      addTodo(longText);
      
      const todoList = document.getElementById('todo-list');
      const span = todoList?.querySelector('span');
      expect(span?.textContent).toBe(longText);
    });

    it('should handle todo list not existing', () => {
      document.body.innerHTML = '<div></div>';
      
      // Should not throw error
      expect(() => addTodo('Test')).not.toThrow();
    });
  });

  describe('removeTodo', () => {
    it('should remove a todo item from the list', () => {
      addTodo('Todo to remove');
      
      const todoList = document.getElementById('todo-list');
      const item = todoList?.firstElementChild as HTMLElement;
      
      expect(todoList?.children.length).toBe(1);
      
      removeTodo(item);
      
      expect(todoList?.children.length).toBe(0);
    });

    it('should remove the correct item from multiple todos', () => {
      addTodo('First todo');
      addTodo('Second todo');
      addTodo('Third todo');
      
      const todoList = document.getElementById('todo-list');
      const items = Array.from(todoList?.children || []) as HTMLElement[];
      
      // Remove the second item
      removeTodo(items[1]);
      
      expect(todoList?.children.length).toBe(2);
      
      const remainingItems = Array.from(todoList?.children || []);
      const remainingTexts = remainingItems.map(item => 
        item.querySelector('span')?.textContent
      );
      
      expect(remainingTexts).toEqual(['First todo', 'Third todo']);
    });

    it('should work with element.remove()', () => {
      addTodo('Test item');
      
      const todoList = document.getElementById('todo-list');
      const item = todoList?.firstElementChild as HTMLElement;
      
      // Spy on remove method
      const removeSpy = vi.spyOn(item, 'remove');
      
      removeTodo(item);
      
      expect(removeSpy).toHaveBeenCalled();
      expect(todoList?.children.length).toBe(0);
    });

    it('should handle removing last item', () => {
      addTodo('Only todo');
      
      const todoList = document.getElementById('todo-list');
      const item = todoList?.firstElementChild as HTMLElement;
      
      removeTodo(item);
      
      expect(todoList?.children.length).toBe(0);
      expect(todoList?.innerHTML).toBe('');
    });

    it('should handle removing first item', () => {
      addTodo('First');
      addTodo('Second');
      addTodo('Third');
      
      const todoList = document.getElementById('todo-list');
      const firstItem = todoList?.firstElementChild as HTMLElement;
      
      removeTodo(firstItem);
      
      const firstSpan = todoList?.firstElementChild?.querySelector('span');
      expect(firstSpan?.textContent).toBe('Second');
    });
  });

  describe('delete button functionality', () => {
    it('should remove todo when delete button is clicked', () => {
      addTodo('Clickable todo');
      
      const todoList = document.getElementById('todo-list');
      const button = todoList?.querySelector('button') as HTMLElement;
      
      expect(todoList?.children.length).toBe(1);
      
      button.click();
      
      expect(todoList?.children.length).toBe(0);
    });

    it('should remove only the clicked todo', () => {
      addTodo('Todo 1');
      addTodo('Todo 2');
      addTodo('Todo 3');
      
      const todoList = document.getElementById('todo-list');
      const buttons = Array.from(todoList?.querySelectorAll('button') || []) as HTMLElement[];
      
      // Click second todo's delete button
      buttons[1].click();
      
      expect(todoList?.children.length).toBe(2);
      
      const remainingTexts = Array.from(todoList?.children || []).map(item => 
        item.querySelector('span')?.textContent
      );
      
      expect(remainingTexts).toEqual(['Todo 1', 'Todo 3']);
    });

    it('should have delete button with event listener', () => {
      addTodo('Test');
      
      const todoList = document.getElementById('todo-list');
      const button = todoList?.querySelector('button') as HTMLElement;
      
      // Button should be clickable and trigger removal
      const initialCount = todoList?.children.length || 0;
      button.click();
      const afterCount = todoList?.children.length || 0;
      
      expect(afterCount).toBeLessThan(initialCount);
    });

    it('should work with multiple rapid clicks', () => {
      addTodo('Todo 1');
      addTodo('Todo 2');
      
      const todoList = document.getElementById('todo-list');
      const buttons = Array.from(todoList?.querySelectorAll('button') || []) as HTMLElement[];
      
      // Click both buttons
      buttons[0].click();
      buttons[1].click();
      
      expect(todoList?.children.length).toBe(0);
    });
  });

  describe('initTodoList', () => {
    it('should initialize event listeners', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      // Add a todo via button click
      input.value = 'New todo';
      addButton.click();
      
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(1);
    });

    it('should add todo when button is clicked', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = 'Test todo';
      addButton.click();
      
      const todoList = document.getElementById('todo-list');
      const span = todoList?.querySelector('span');
      expect(span?.textContent).toBe('Test todo');
    });

    it('should clear input after adding todo', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = 'Test todo';
      addButton.click();
      
      expect(input.value).toBe('');
    });

    it('should not add empty todos', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = '';
      addButton.click();
      
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(0);
    });

    it('should trim whitespace from input', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = '   Trimmed todo   ';
      addButton.click();
      
      const todoList = document.getElementById('todo-list');
      const span = todoList?.querySelector('span');
      expect(span?.textContent).toBe('Trimmed todo');
    });

    it('should not add whitespace-only todos', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = '     ';
      addButton.click();
      
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(0);
    });

    it('should add todo when Enter key is pressed', () => {
      initTodoList();
      
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = 'Todo from Enter';
      
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      input.dispatchEvent(enterEvent);
      
      const todoList = document.getElementById('todo-list');
      const span = todoList?.querySelector('span');
      expect(span?.textContent).toBe('Todo from Enter');
    });

    it('should clear input after pressing Enter', () => {
      initTodoList();
      
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = 'Test';
      
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      input.dispatchEvent(enterEvent);
      
      expect(input.value).toBe('');
    });

    it('should not add todo on other key presses', () => {
      initTodoList();
      
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      input.value = 'Test';
      
      const spaceEvent = new KeyboardEvent('keypress', { key: ' ' });
      input.dispatchEvent(spaceEvent);
      
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(0);
    });

    it('should handle multiple todos added in sequence', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      
      const todos = ['First', 'Second', 'Third'];
      
      todos.forEach(todo => {
        input.value = todo;
        addButton.click();
      });
      
      const todoList = document.getElementById('todo-list');
      expect(todoList?.children.length).toBe(3);
    });

    it('should handle missing add button gracefully', () => {
      document.body.innerHTML = `
        <input type="text" id="todo-input" />
        <ul id="todo-list"></ul>
      `;
      
      expect(() => initTodoList()).not.toThrow();
    });

    it('should handle missing input gracefully', () => {
      document.body.innerHTML = `
        <button id="add-todo-btn">Add</button>
        <ul id="todo-list"></ul>
      `;
      
      expect(() => initTodoList()).not.toThrow();
    });
  });

  describe('integration tests', () => {
    it('should handle complete todo workflow', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      const todoList = document.getElementById('todo-list');
      
      // Add todos
      input.value = 'Buy milk';
      addButton.click();
      
      input.value = 'Walk dog';
      addButton.click();
      
      input.value = 'Write code';
      addButton.click();
      
      expect(todoList?.children.length).toBe(3);
      
      // Delete middle todo
      const buttons = Array.from(todoList?.querySelectorAll('button') || []) as HTMLElement[];
      buttons[1].click();
      
      expect(todoList?.children.length).toBe(2);
      
      // Verify remaining todos
      const remainingTexts = Array.from(todoList?.children || []).map(item => 
        item.querySelector('span')?.textContent
      );
      
      expect(remainingTexts).toEqual(['Buy milk', 'Write code']);
    });

    it('should maintain functionality after multiple operations', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      const todoList = document.getElementById('todo-list');
      
      // Add and remove multiple times
      for (let i = 0; i < 5; i++) {
        input.value = `Todo ${i}`;
        addButton.click();
      }
      
      expect(todoList?.children.length).toBe(5);
      
      // Remove some todos
      let buttons = Array.from(todoList?.querySelectorAll('button') || []) as HTMLElement[];
      buttons[0].click();
      buttons[2].click();
      
      expect(todoList?.children.length).toBe(3);
      
      // Add more todos
      input.value = 'New todo';
      addButton.click();
      
      expect(todoList?.children.length).toBe(4);
    });

    it('should work with both button click and Enter key', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      const todoList = document.getElementById('todo-list');
      
      // Add via button
      input.value = 'Button todo';
      addButton.click();
      
      // Add via Enter key
      input.value = 'Enter todo';
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      input.dispatchEvent(enterEvent);
      
      expect(todoList?.children.length).toBe(2);
      
      const texts = Array.from(todoList?.children || []).map(item => 
        item.querySelector('span')?.textContent
      );
      
      expect(texts).toEqual(['Button todo', 'Enter todo']);
    });

    it('should handle rapid todo additions', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      const todoList = document.getElementById('todo-list');
      
      // Rapidly add 20 todos
      for (let i = 0; i < 20; i++) {
        input.value = `Rapid todo ${i}`;
        addButton.click();
      }
      
      expect(todoList?.children.length).toBe(20);
      
      // Verify all have delete buttons
      const buttons = todoList?.querySelectorAll('button');
      expect(buttons?.length).toBe(20);
    });

    it('should clear all todos by clicking all delete buttons', () => {
      initTodoList();
      
      const addButton = document.getElementById('add-todo-btn') as HTMLElement;
      const input = document.getElementById('todo-input') as HTMLInputElement;
      const todoList = document.getElementById('todo-list');
      
      // Add multiple todos
      for (let i = 0; i < 5; i++) {
        input.value = `Todo ${i}`;
        addButton.click();
      }
      
      expect(todoList?.children.length).toBe(5);
      
      // Delete all
      while (todoList?.children.length || 0 > 0) {
        const button = todoList?.querySelector('button') as HTMLElement;
        button?.click();
      }
      
      expect(todoList?.children.length).toBe(0);
    });
  });

  describe('DOM structure tests', () => {
    it('should create proper HTML structure', () => {
      addTodo('Structured todo');
      
      const todoList = document.getElementById('todo-list');
      const li = todoList?.firstElementChild;
      
      // Check structure: li > span, button
      expect(li?.tagName).toBe('LI');
      expect(li?.children.length).toBeGreaterThanOrEqual(2);
      
      const span = li?.querySelector('span');
      const button = li?.querySelector('button');
      
      expect(span).toBeTruthy();
      expect(button).toBeTruthy();
    });

    it('should maintain proper parent-child relationships', () => {
      addTodo('Parent test');
      
      const todoList = document.getElementById('todo-list');
      const li = todoList?.firstElementChild;
      const span = li?.querySelector('span');
      const button = li?.querySelector('button');
      
      expect(span?.parentElement).toBe(li);
      expect(button?.parentElement).toBe(li);
      expect(li?.parentElement).toBe(todoList);
    });

    it('should append todos to the end of the list', () => {
      addTodo('First');
      addTodo('Last');
      
      const todoList = document.getElementById('todo-list');
      const lastItem = todoList?.lastElementChild;
      const lastSpan = lastItem?.querySelector('span');
      
      expect(lastSpan?.textContent).toBe('Last');
    });
  });
});
