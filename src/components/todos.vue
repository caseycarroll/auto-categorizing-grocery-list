<script setup lang="ts">
import Todo from './todo.vue';
import { ref } from 'vue';

interface TodoItem {
    checked: boolean;
    name: string;
    id: number;
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
    checked: false
  };
  todos.value.push(newTodo);
  newTodoName.value = '';
  document.dispatchEvent(new CustomEvent('todoAdded', { detail: { id: newTodo.id, name: newTodo.name } }));
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
      :checked="todo.checked" 
      :name="todo.name"
      @checkedChange="(checked: boolean) => handleCheckChanged(todo.id, checked)" />
  </ul>
</template>
