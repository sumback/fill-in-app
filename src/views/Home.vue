<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Home' });
</script>

<template>
  <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20"></div>
</template>
