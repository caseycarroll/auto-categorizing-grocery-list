<script setup lang="ts">
import { categoryOptions, type CategoryUnion } from '../constants/category-options';
import { Icon } from '@iconify/vue';

interface Props {
    name: string;
    id: number;
    isEditable?: boolean;
    isClassifying?: boolean;
}

const { name, id, isEditable = true, isClassifying = false } = defineProps<Props>();
const emit = defineEmits<{
    (e: 'delete', id: number): void;
}>();
const checked = defineModel('checked', { type: Boolean, default: false });
const selectedCategory = defineModel<CategoryUnion>('selectedCategory', { default: "Other" });

</script>

<template>
    <li class="cluster todo-item" :class="isEditable && 'edit'">
        <input type="checkbox" :id="name" v-model="checked" />
        <label class="text-overflow-ellipsis" :for="name" :class="checked && 'text-strikethrough'">{{ name }}</label>
        <span v-if="isClassifying" class="classifying-placeholder">...</span>
        <select v-else-if="isEditable" v-model="selectedCategory" :id="selectedCategory + '-' + id" title="Item category">
            <option v-for="category in categoryOptions" :key="category" :value="category">
                {{ category }}
            </option>
        </select>
        <button v-if="isEditable" @click="$emit('delete', id)" title="delete item" class="delete-btn">
            <Icon icon="basil:trash-alt-solid" />
        </button>
    </li>
</template>

<style scoped>
.todo-item {
    flex-wrap: nowrap;
    --gutter: var(--space-2xs);
    --space: var(--space-m);
    
    padding-inline: var(--space-s);

    border: 1px solid hsl(0, 0%, 70%);
    border-radius: var(--radius-lg);

    background-color: #ffffff;

    label {
        flex-grow: 1;
        padding-block: var(--space-m);
    }

    select {
        max-width: 15ch;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .text-strikethrough {
        text-decoration: line-through;
        text-decoration-color: var(--color-secondary-foreground);
        color: var(--color-secondary-foreground);
    }
}

.todo-item.edit {
    border: 1px dashed var(--color-secondary-foreground);
}

.delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 3px solid hsl(0, 38%, 54%);
    background-color: hsl(0, 89%, 96%);
    margin-inline-start: var(--space-xs);
    border-radius: var(--radius-m);
    & > svg {
        color: hsl(0, 55%, 43%);
        transform: translateY(2px);
    }
}

.classifying-placeholder {
    color: var(--color-secondary-foreground);
    min-width: 10ch;
    text-align: center;
}
</style>
