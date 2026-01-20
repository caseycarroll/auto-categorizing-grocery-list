<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import Todo from './todo.vue';
import { categoryOptions, type CategoryUnion } from '../constants/category-options';
import { actions } from 'astro:actions';
import { createGroceryClassifier, type ClassifierMemory } from '../libs/grocery-classifier';
import { Icon } from '@iconify/vue';

interface TodoItem {
    checked: boolean;
    name: string;
    id: number;
    category: CategoryUnion;
}

const props = defineProps<{ initialTodos: TodoItem[], initialClassifierMemory: ClassifierMemory }>();
const classifierMemory = shallowRef<ClassifierMemory>(props.initialClassifierMemory);
const todos = ref<TodoItem[]>(props.initialTodos);
const isEditing = ref(true);
const newTodoName = ref('');

async function addTodo() {
  if (!newTodoName.value.trim()) {
    return;
  }

  const groceryClassifier = createGroceryClassifier(classifierMemory.value);
  const classification = groceryClassifier.classify(newTodoName.value.trim());
  
  const newTodo: TodoItem = {
    id: Date.now(),
    name: newTodoName.value.trim(),
    checked: false,
    category: classification
  };
  todos.value.push(newTodo);
  newTodoName.value = '';
  
  const { error: addTodoError } = await actions.addTodo({ 
      id: newTodo.id,
      name: newTodo.name, 
      category: newTodo.category
    });
    if(addTodoError) console.log('Error adding todo:', addTodoError);
}

async function handleDelete(id: number) {
  todos.value = todos.value.filter(todo => todo.id !== id);
  const { error } = await actions.deleteTodo({ id });
  if(error) console.log('Error deleting todo:', error);
}

async function handleCategoryChanged(id: number, category: CategoryUnion) {
  const todo = todos.value.find(todo => todo.id === id);
  if (!todo) {
    return;
  }
  todo.category = category;
  const { error } = await actions.updateTodoCategory({ id, category });
  if(error) console.log('Error updating todo category:', error);
  const { data, error: trainError } = await actions.trainClassifier({ name: todo.name, category });
  if(trainError) { 
    console.log('Error training classifier:', trainError);
    return;
  }
  classifierMemory.value = data[0] as ClassifierMemory;
}

async function handleCheckChanged(id: number, checked: boolean) {
  const todo = todos.value.find(todo => todo.id === id);
  if (!todo) {
    return;
  }
  todo.checked = checked;
  const { error } = await actions.updateTodoChecked({ id, checked });
  if(error) console.log('Error updating todo checked status:', error);
}

async function onClearCompleted() {
  const completedTodoIds = todos.value.filter(todo => todo.checked).map(todo => todo.id);
  todos.value = todos.value.filter(todo => !todo.checked);
  const { error } = await actions.clearCompletedTodos({ ids: completedTodoIds });
  if(error) console.log('Error clearing completed todos:', error);
}

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
      <form @submit.prevent="addTodo">
        <label for="new-todo">New item</label>
        <div class="cluster">
          <input class="item-name-input" id="new-todo" type="text" v-model="newTodoName" autocomplete="off">
          <button type="submit">
            <span class="cluster" style="--gutter: var(--space-2xs);">
              <Icon icon="basil:plus-solid" style="font-size: 1.5em;" />
              Add
            </span>
          </button>
        </div>
      </form>
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
            v-model:checked="todo.checked"
            @update:checked="(checked: boolean) => handleCheckChanged(todo.id, checked)"
            v-model:selectedCategory="todo.category"
            @update:selectedCategory="(category: CategoryUnion) => handleCategoryChanged(todo.id, category)"
            @delete="(id: number) => handleDelete(id)" />
        </ul>
      </div>
      <div v-else class="flow">
        <div v-for="category in categoryOptions" class="flow">
          <h2>{{ category }}</h2>
          <ul role="list" class="flow todo-list">
            <Todo 
              v-for="todo in todos.filter(todo => todo.category === category)" 
              :key="todo.id"
              :id="todo.id"
              :name="todo.name"
              v-model:checked="todo.checked"
              @update:checked="(checked: boolean) => handleCheckChanged(todo.id, checked)"
              v-model:selectedCategory="todo.category"
              @update:selectedCategory="(category: CategoryUnion) => handleCategoryChanged(todo.id, category)"
              @delete="(id: number) => handleDelete(id)"
              :is-editable="false" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  ul > li {
    --flow-space: var(--space-s);
  }

  .wrapper {
    padding-block-end: var(--space-2xl);
  }

  .item-name-input {
    flex-grow: 1;
  }
</style>
