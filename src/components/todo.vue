<script setup lang="ts">
interface Props {
    checked: boolean;
    name: string;
}

const props = defineProps<Props>();


</script>

<template>
    <li>
      <input type="checkbox" :id="props.name" :checked="props.checked" />
      <label :for="props.name">{{props.name}}</label>
    </li>
</template>