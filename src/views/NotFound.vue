<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Error', secondLevelPage: '404' });
</script>

<template></template>
