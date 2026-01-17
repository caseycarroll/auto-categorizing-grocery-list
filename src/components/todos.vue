<script setup lang="ts">
import Todo from './todo.vue';
import { ref } from 'vue';

interface TodoItem {
    checked: boolean;
    name: string;
    id: number;
    category: string;
}

const props = defineProps<{ initialTodos: TodoItem[] }>();
const todos = ref<TodoItem[]>(props.initialTodos);
const newTodoName = ref('');

function handleCheckChanged(id: number, checked: boolean) {
  const todo = todos.value.find(todo => todo.id === id);
  if (!todo) {
    return;
  }
  todo.checked = checked;
  document.dispatchEvent(new CustomEvent('checkedChange', { detail: { id, checked } }));
}

function addTodo() {
  if (!newTodoName.value.trim()) {
    return;
  }
  const newTodo: TodoItem = {
    id: Date.now(),
    name: newTodoName.value.trim(),
    checked: false,
    category: 'Other'
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

</script>

<template>
  <form @submit.prevent="addTodo">
    <input type="text" v-model="newTodoName">
    <button type="submit">Add Todo</button>
  </form>
  <ul role="list" class="flow">
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
</template>
