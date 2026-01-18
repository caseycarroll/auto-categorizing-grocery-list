<script setup lang="ts">
import { ref } from 'vue';
import Todo from './todo.vue';
import { categoryOptions, type CategoryUnion } from '../constants/category-options';
import { actions } from 'astro:actions';

interface TodoItem {
    checked: boolean;
    name: string;
    id: number;
    category: CategoryUnion;
}

const props = defineProps<{ initialTodos: TodoItem[] }>();
const todos = ref<TodoItem[]>(props.initialTodos);
const isEditing = ref(true);

const newTodoName = ref('');

async function addTodo() {
  if (!newTodoName.value.trim()) {
    return;
  }
  const { data: classification, error:classificationError } = await actions.classifyItem({ name: newTodoName.value });
  if(classificationError) console.log('Error classifying item:', classificationError);

  const newTodo: TodoItem = {
    id: Date.now(),
    name: newTodoName.value.trim(),
    checked: false,
    category: classification || 'Other'
  };
  todos.value.push(newTodo);
  newTodoName.value = '';
  
  const { error: addTodoError } = await actions.addTodo({ id: newTodo.id, name: newTodo.name, category: newTodo.category });
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
  const { error: trainError } = await actions.trainClassifier({ name: todo.name, category });
  if(trainError) console.log('Error training classifier:', trainError);
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

</script>

<template>
  <div class="flow">
    <header class="cluster--space-between">
      <h1>Groceries</h1>
      <button @click="isEditing = !isEditing">
        <span>Toggle View</span>
      </button>
    </header>
    <div class="flow-l">
      <form @submit.prevent="addTodo">
        <label for="new-todo">New item</label>
        <div class="cluster">
          <input id="new-todo" type="text" v-model="newTodoName" autocomplete="off">
          <button type="submit">
            <span>Add item</span>
          </button>
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
            @update:selectedCategory="(category: CategoryUnion) => handleCategoryChanged(todo.id, category)"
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
              @update:selectedCategory="(category: CategoryUnion) => handleCategoryChanged(todo.id, category)"
              @delete="(id: number) => handleDelete(id)"
              :is-editable="false" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>