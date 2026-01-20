<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const emit = defineEmits<{
  (e: 'add', name: string): void;
}>();

const newTodoName = ref('');

function onAdd() {
  if (!newTodoName.value.trim()) return;
  emit('add', newTodoName.value);
  newTodoName.value = '';
}
</script>

<template>
  <form @submit.prevent="onAdd">
    <label for="new-todo">New item</label>
    <div class="cluster">
      <input 
        class="item-name-input" 
        id="new-todo" 
        type="text" 
        v-model="newTodoName" 
        autocomplete="off"
      >
      <button type="submit">
        <span class="cluster" style="--gutter: var(--space-2xs);">
          <Icon icon="basil:plus-solid" style="font-size: 1.5em;" />
          Add
        </span>
      </button>
    </div>
  </form>
</template>

<style scoped>
  .item-name-input {
    flex-grow: 1;
  }
</style>
