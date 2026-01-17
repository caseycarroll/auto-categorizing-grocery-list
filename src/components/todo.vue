<script setup lang="ts">
import { categoryOptions } from '../constants/category-options';

interface Props {
    name: string;
    id: number;
    isEditable?: boolean;
}

const { name, id, isEditable = true } = defineProps<Props>();
const emit = defineEmits<{
    (e: 'delete', id: number): void;
}>();
const checked = defineModel('checked', { type: Boolean, default: false });
const selectedCategory = defineModel('selectedCategory', { default: "Other" });

</script>

<template>
    <li class="cluster todo-item">
        <input type="checkbox" :id="name" v-model="checked" />
        <label :for="name" :class="checked && 'text-strikethrough'">{{ name }}</label>
        <select v-if="isEditable" v-model="selectedCategory" :id="selectedCategory + '-' + id" title="Item category">
            <option v-for="category in categoryOptions" :key="category" :value="category">
                {{ category }}
            </option>
        </select>
        <button v-if="isEditable" @click="$emit('delete', id)">Delete</button>
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
        padding-block: var(--space-md);
    }

    .text-strikethrough {
        text-decoration: line-through;
        text-decoration-color: var(--color-secondary-foreground);
        color: var(--color-secondary-foreground);
    }
}
</style>
