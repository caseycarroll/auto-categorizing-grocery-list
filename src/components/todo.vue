<script setup lang="ts">
interface Props {
    checked: boolean;
    name: string;
}

const props = defineProps<Props>();


</script>

<template>
  <input type="checkbox" id="test" :checked="props.checked" />
  <label for="test">{{props.name}}</label>
</template>