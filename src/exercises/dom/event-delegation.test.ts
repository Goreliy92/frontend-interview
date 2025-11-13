/**
 * Tests for Event Delegation Exercise
 * 
 * Note: These tests use JSDOM to simulate DOM environment
 * In a real browser, the behavior would be identical
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  addItem,
  editItem,
  removeItem,
  handleListClick,
  initEventDelegation,
  getItemCount,
  clearAllItems
} from './event-delegation';

describe('Event Delegation', () => {
  beforeEach(() => {
    // Setup DOM structure before each test
    document.body.innerHTML = `
      <div>
        <input type="text" id="item-input" />
        <button id="add-item-btn">Add Item</button>
        <ul id="item-list"></ul>
      </div>
    `;
  });

  describe('addItem', () => {
    it('should add an item to the list', () => {
      addItem('Test Item');
      
      const list = document.getElementById('item-list');
      expect(list?.children.length).toBe(1);
      
      const item = list?.firstElementChild;
      expect(item?.className).toBe('item');
    });

    it('should create item with text, edit button, and delete button', () => {
      addItem('Test Item');
      
      const item = document.querySelector('.item');
      const textSpan = item?.querySelector('.item-text');
      const editBtn = item?.querySelector('.edit-btn');
      const deleteBtn = item?.querySelector('.delete-btn');
      
      expect(textSpan?.textContent).toBe('Test Item');
      expect(editBtn?.getAttribute('data-action')).toBe('edit');
      expect(deleteBtn?.getAttribute('data-action')).toBe('delete');
    });

    it('should add multiple items', () => {
      addItem('Item 1');
      addItem('Item 2');
      addItem('Item 3');
      
      expect(getItemCount()).toBe(3);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the list', () => {
      addItem('Item to remove');
      
      const item = document.querySelector('.item') as HTMLElement;
      expect(getItemCount()).toBe(1);
      
      removeItem(item);
      expect(getItemCount()).toBe(0);
    });

    it('should remove correct item from multiple items', () => {
      addItem('Item 1');
      addItem('Item 2');
      addItem('Item 3');
      
      const items = document.querySelectorAll('.item');
      removeItem(items[1] as HTMLElement);
      
      expect(getItemCount()).toBe(2);
      const remainingTexts = Array.from(document.querySelectorAll('.item-text'))
        .map(el => el.textContent);
      expect(remainingTexts).toEqual(['Item 1', 'Item 3']);
    });
  });

  describe('editItem', () => {
    it('should replace text span with input field', () => {
      addItem('Original Text');
      
      const item = document.querySelector('.item') as HTMLElement;
      editItem(item);
      
      const input = item.querySelector('input');
      expect(input).toBeTruthy();
      expect(input?.value).toBe('Original Text');
    });

    it('should save edited text on Enter key', () => {
      addItem('Original Text');
      
      const item = document.querySelector('.item') as HTMLElement;
      editItem(item);
      
      const input = item.querySelector('input') as HTMLInputElement;
      input.value = 'New Text';
      
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      input.dispatchEvent(enterEvent);
      
      const textSpan = item.querySelector('.item-text');
      expect(textSpan?.textContent).toBe('New Text');
    });

    it('should save edited text on blur', () => {
      addItem('Original Text');
      
      const item = document.querySelector('.item') as HTMLElement;
      editItem(item);
      
      const input = item.querySelector('input') as HTMLInputElement;
      input.value = 'Blurred Text';
      
      input.dispatchEvent(new Event('blur'));
      
      const textSpan = item.querySelector('.item-text');
      expect(textSpan?.textContent).toBe('Blurred Text');
    });
  });

  describe('handleListClick', () => {
    it('should handle delete button click', () => {
      addItem('Item to delete');
      
      const deleteBtn = document.querySelector('.delete-btn') as HTMLElement;
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: deleteBtn, enumerable: true });
      
      handleListClick(clickEvent);
      
      expect(getItemCount()).toBe(0);
    });

    it('should handle edit button click', () => {
      addItem('Item to edit');
      
      const editBtn = document.querySelector('.edit-btn') as HTMLElement;
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: editBtn, enumerable: true });
      
      handleListClick(clickEvent);
      
      const item = document.querySelector('.item');
      const input = item?.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should ignore clicks on non-button elements', () => {
      addItem('Item');
      
      const textSpan = document.querySelector('.item-text') as HTMLElement;
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: textSpan, enumerable: true });
      
      handleListClick(clickEvent);
      
      // Item should still exist
      expect(getItemCount()).toBe(1);
    });
  });

  describe('initEventDelegation', () => {
    it('should set up event delegation on the list', () => {
      initEventDelegation();
      
      addItem('Test Item');
      
      const deleteBtn = document.querySelector('.delete-btn') as HTMLElement;
      deleteBtn.click();
      
      // If event delegation is working, item should be removed
      expect(getItemCount()).toBe(0);
    });

    it('should add item when add button is clicked', () => {
      initEventDelegation();
      
      const input = document.getElementById('item-input') as HTMLInputElement;
      const addButton = document.getElementById('add-item-btn') as HTMLElement;
      
      input.value = 'New Item';
      addButton.click();
      
      expect(getItemCount()).toBe(1);
      expect(input.value).toBe('');
    });

    it('should add item on Enter key in input', () => {
      initEventDelegation();
      
      const input = document.getElementById('item-input') as HTMLInputElement;
      input.value = 'Item from Enter';
      
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      input.dispatchEvent(enterEvent);
      
      expect(getItemCount()).toBe(1);
    });
  });

  describe('helper functions', () => {
    it('getItemCount should return correct count', () => {
      expect(getItemCount()).toBe(0);
      
      addItem('Item 1');
      expect(getItemCount()).toBe(1);
      
      addItem('Item 2');
      expect(getItemCount()).toBe(2);
    });

    it('clearAllItems should remove all items', () => {
      addItem('Item 1');
      addItem('Item 2');
      addItem('Item 3');
      
      expect(getItemCount()).toBe(3);
      
      clearAllItems();
      expect(getItemCount()).toBe(0);
    });
  });

  describe('Event Delegation Benefits', () => {
    it('should work with dynamically added items without re-attaching listeners', () => {
      initEventDelegation();
      
      // Add items after initialization
      addItem('Dynamic Item 1');
      addItem('Dynamic Item 2');
      
      // Try to delete the second item
      const deleteButtons = document.querySelectorAll('.delete-btn');
      (deleteButtons[1] as HTMLElement).click();
      
      expect(getItemCount()).toBe(1);
    });

    it('should handle many items efficiently with single listener', () => {
      initEventDelegation();
      
      // Add 100 items
      for (let i = 0; i < 100; i++) {
        addItem(`Item ${i}`);
      }
      
      expect(getItemCount()).toBe(100);
      
      // Delete a few items
      const deleteButtons = document.querySelectorAll('.delete-btn');
      (deleteButtons[50] as HTMLElement).click();
      (deleteButtons[75] as HTMLElement).click();
      
      expect(getItemCount()).toBe(98);
    });
  });
});
