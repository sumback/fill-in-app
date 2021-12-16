<script setup lang="ts">
defineProps({
  msg: { type: String, default: '404' },
});
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
