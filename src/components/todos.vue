<script setup lang="ts">
import Todo from './todo.vue';

interface TodoItem {
    checked: boolean;
    name: string;
}

const props = defineProps<{ todos: TodoItem[] }>();
</script>

<template>
  <ul role="list" class="flow">
    <Todo v-for="todo in props.todos" :key="todo.name" :checked="todo.checked" :name="todo.name" />
  </ul>
</template>