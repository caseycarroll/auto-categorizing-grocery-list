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
  <ul role="list" class="flow">
    <Todo 
      v-for="todo in todos" 
      :key="todo.id"
      :id="todo.id"
      :checked="todo.checked" 
      :name="todo.name"
      @checkedChange="(checked) => handleCheckChanged(todo.id, checked)" />
  </ul>
</template>
