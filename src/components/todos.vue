<script setup lang="ts">
import { ref } from 'vue';
import Todo from './todo.vue';
import { categoryOptions } from '../constants/category-options';
import { createGroceryClassifier } from '../libs/index';

interface TodoItem {
    checked: boolean;
    name: string;
    id: number;
    category: string;
}

const props = defineProps<{ initialTodos: TodoItem[] }>();
const todos = ref<TodoItem[]>(props.initialTodos);
const isEditing = ref(true);

const groceryClassifier = createGroceryClassifier();
groceryClassifier.train('Organic dairy milk', 'Dairy and Eggs')
groceryClassifier.train('Organic Red Apples', 'Produce')
groceryClassifier.train('greEn apples', 'Produce')
groceryClassifier.train('deoderant', 'Personal Care')
groceryClassifier.train('butter', 'Dairy and Eggs')
groceryClassifier.train('Cornstarch', 'Baking')
groceryClassifier.train('Flour', 'Baking')

const newTodoName = ref('');
function addTodo() {
  if (!newTodoName.value.trim()) {
    return;
  }
  const newTodo: TodoItem = {
    id: Date.now(),
    name: newTodoName.value.trim(),
    checked: false,
    category: groceryClassifier.classify(newTodoName.value.trim())
  };
  todos.value.push(newTodo);
  newTodoName.value = '';
  document.dispatchEvent(new CustomEvent('todoAdded', { detail: { id: newTodo.id, name: newTodo.name, category: newTodo.category } }));
}

function handleDelete(id: number) {
  todos.value = todos.value.filter(todo => todo.id !== id);
  document.dispatchEvent(new CustomEvent('todoDeleted', { detail: { id } }));
}

function handleCategoryChanged(id: number, category: string) {
  const todo = todos.value.find(todo => todo.id === id);
  if (!todo) {
    return;
  }
  todo.category = category;
  document.dispatchEvent(new CustomEvent('categoryChanged', { detail: { id, category } }));
}

function handleCheckChanged(id: number, checked: boolean) {
  const todo = todos.value.find(todo => todo.id === id);
  if (!todo) {
    return;
  }
  todo.checked = checked;
  document.dispatchEvent(new CustomEvent('checkedChange', { detail: { id, checked } }));
}

</script>

<template>
  <div class="flow">
    <header class="cluster--space-between">
      <h1>Groceries</h1>
      <button @click="isEditing = !isEditing">{{ isEditing ? 'Switch to View' : 'Switch to Edit' }}</button>
    </header>
    <div class="flow-l">
      <form @submit.prevent="addTodo">
        <label for="new-todo">New item</label>
        <div class="cluster">
          <input id="new-todo" type="text" v-model="newTodoName">
          <button type="submit">Add item</button>
        </div>
      </form>
      <div v-if="isEditing">
        <ul role="list" class="flow-sm todo-list">
          <Todo 
            v-for="todo in todos" 
            :key="todo.id"
            :id="todo.id"
            :name="todo.name"
            v-model:checked="todo.checked"
            @update:checked="(checked: boolean) => handleCheckChanged(todo.id, checked)"
            v-model:selectedCategory="todo.category"
            @update:selectedCategory="(category: string) => handleCategoryChanged(todo.id, category)"
            @delete="(id: number) => handleDelete(id)" />
        </ul>
      </div>
      <div v-else class="flow">
        <div v-for="category in categoryOptions" class="flow-sm">
          <h2>{{ category }}</h2>
          <ul role="list" class="flow-sm todo-list">
            <Todo 
              v-for="todo in todos.filter(todo => todo.category === category)" 
              :key="todo.id"
              :id="todo.id"
              :name="todo.name"
              v-model:checked="todo.checked"
              @update:checked="(checked: boolean) => handleCheckChanged(todo.id, checked)"
              v-model:selectedCategory="todo.category"
              @update:selectedCategory="(category: string) => handleCategoryChanged(todo.id, category)"
              @delete="(id: number) => handleDelete(id)"
              :is-editable="false" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>