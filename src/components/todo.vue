<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    checked: Boolean,
    name: String
});

</script>

<template>
  <input type="checkbox" id="test" checked={{props.checked}} />
  <label for="test">{{props.name}}</label>
</template>