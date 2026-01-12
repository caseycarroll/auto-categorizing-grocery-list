<script setup lang="ts">
interface Props {
    checked: boolean;
    name: string;
}

const props = defineProps<Props>();


</script>

<template>
    <li class="todo-item">
      <input type="checkbox" :id="props.name" :checked="props.checked" />
      <label :for="props.name">{{props.name}}</label>
    </li>
</template>

<style scoped>
.todo-item {
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
}
</style>