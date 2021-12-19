<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Home' });
</script>

<template></template>
