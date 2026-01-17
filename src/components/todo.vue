<script setup lang="ts">
interface Props {
    checked: boolean;
    name: string;
    id: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'checkedChange', checked: boolean): void;
  (e: 'delete', id: number): void;
}>();

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('checkedChange', target.checked);
};
</script>

<template>
    <li class="todo-item">
      <input 
        type="checkbox" 
        :id="props.name" 
        :checked="props.checked" 
        @change="handleChange" />
      <label :for="props.name">{{props.name}}</label>
      <button @click="$emit('delete', props.id)">Delete</button>
    </li>
</template>

<style scoped>
.todo-item {
    isolation: isolate;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    border: 1px dashed var(--color-primary-foreground);
    border-radius: var(--radius-lg);
    position: relative;

    label {
        flex-grow: 1;
        &:after {
            content: '';
            inset: 0;
            position: absolute;
        }
    }

    button {
        z-index: 1;
    }
}
</style>

