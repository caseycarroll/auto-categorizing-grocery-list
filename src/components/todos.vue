<script setup lang="ts">
import { ref } from 'vue';
import Todo from './todo.vue';
import CategorizedList from './CategorizedList.vue';
import AddItem from './addItem.vue';
import { type CategoryUnion } from '../constants/category-options';
import { useTodos, type TodoItem } from '../composables/useTodos';
import { Icon } from '@iconify/vue';

const props = defineProps<{ initialTodos: TodoItem[] }>();
const {
  todos,
  addTodo,
  handleDelete,
  handleCategoryChanged,
  handleCheckChanged,
  onClearCompleted
} = useTodos(props.initialTodos);

const isEditing = ref(true);

</script>

<template>
  <div class="flow wrapper">
    <header class="repel">
      <h1>Groceries</h1>
      <button @click="isEditing = !isEditing">
        <span>Toggle View</span>
      </button>
    </header>
    <div class="flow">
      <AddItem @add="addTodo" />
      <hr />
      <div v-if="isEditing" class="flow">
        <div class="repel">
          <div></div>
          <button class="secondary" @click="onClearCompleted">
            <span class="cluster" style="--gutter: var(--space-2xs);">
              <Icon style="font-size: 1.5em;" icon="basil:backspace-solid"></Icon>
              Clear completed
            </span>
          </button>
        </div>
        <ul role="list" class="flow todo-list">
          <Todo 
            v-for="todo in todos" 
            :key="todo.id"
            :id="todo.id"
            :name="todo.name"
            :is-classifying="todo.isClassifying"
            v-model:checked="todo.checked"
            @update:checked="(checked: boolean) => handleCheckChanged(todo.id, checked)"
            v-model:selectedCategory="todo.category"
            @update:selectedCategory="(category: CategoryUnion) => handleCategoryChanged(todo.id, category)"
            @delete="(id: number) => handleDelete(id)" />
        </ul>
      </div>
      <CategorizedList 
        v-else 
        :todos="todos"
        @update:checked="handleCheckChanged"
        @update:selected-category="handleCategoryChanged" />
    </div>
  </div>
</template>

<style scoped>
  ul > li {
    --flow-space: var(--space-s);
  }

  .todo-list li:last-child {
    margin-block-end: var(--space-xl); 
  }
</style>
