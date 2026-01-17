<script setup lang="ts">
import { categoryOptions } from '../constants/category-options';

interface Props {
    name: string;
    id: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'delete', id: number): void;
}>();
const checked = defineModel('checked', { type: Boolean, default: false });
const selectedCategory = defineModel('selectedCategory', { default: "Other" });

</script>

<template>
    <li class="cluster todo-item">
      <input 
        type="checkbox" 
        :id="props.name" 
        v-model="checked" />
      <label :for="props.name">{{props.name}}</label>
      <select v-model="selectedCategory" :id="selectedCategory + '-' + props.id" title="Item category">
        <option 
            v-for="category in categoryOptions" 
            :key="category"
            :value="category"
            >
                {{category}}
        </option>
      </select>
      <button @click="$emit('delete', props.id)">Delete</button>
    </li>
</template>

<style scoped>
.todo-item {
    --space: var(--space-md);
    padding-inline: var(--space-md);

    border: 1px dashed var(--color-primary-foreground);
    border-radius: var(--radius-lg);

    background-color: #ffffff;

    label {
        flex-grow: 1;
    }

    label {
        padding-block: var(--space-md);
    }
}
</style>

