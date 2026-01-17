<script setup lang="ts">
import { ref, watch } from 'vue';
import { categoryOptions } from '../constants/category-options';

interface Props {
    name: string;
    id: number;
    category: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'delete', id: number): void;
    (e: 'categoryChange', category: string): void;
}>();
const checked = defineModel('checked', { type: Boolean, default: false });

const selectedCategory = ref(props.category);
watch(selectedCategory, (newCategory) => {
    emit('categoryChange', newCategory);
});

</script>

<template>
    <li class="todo-item">
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
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding-inline: var(--space-md);

    border: 1px dashed var(--color-primary-foreground);
    border-radius: var(--radius-lg);

    label {
        flex-grow: 1;
    }

    label {
        padding-block: var(--space-md);
    }
}
</style>

