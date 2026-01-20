<script setup lang="ts">
import type { TodoItem } from '../composables/useTodos';
import { categoryOptions, type CategoryUnion } from '../constants/category-options';
import Todo from './todo.vue';

defineProps<{
  todos: TodoItem[];
}>();

const emit = defineEmits<{
  (e: 'update:checked', id: number, checked: boolean): void;
  (e: 'update:selectedCategory', id: number, category: CategoryUnion): void;
}>();
</script>

<template>
  <div class="flow">
    <div v-for="category in categoryOptions" :key="category" class="flow">
      <h2>{{ category }}</h2>
      <ul role="list" class="flow todo-list">
        <Todo 
          v-for="todo in todos.filter(t => t.category === category)" 
          :key="todo.id"
          :id="todo.id"
          :name="todo.name"
          :is-classifying="todo.isClassifying"
          :checked="todo.checked"
          @update:checked="(checked: boolean) => emit('update:checked', todo.id, checked)"
          :selected-category="todo.category"
          @update:selected-category="(category: CategoryUnion) => emit('update:selectedCategory', todo.id, category)"
          :is-editable="false" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
  ul > li {
    --flow-space: var(--space-s);
  }
</style>
