<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const firstLevelPage = computed(() => store.getters['getFirstLevelPage']);
const secondLevelPage = computed(() => store.getters['getSecondLevelPage']);
const thirdLevelPage = computed(() => store.getters['getThirdLevelPage']);
</script>

<template>
  <nav class="text-black font-bold mb-1" aria-label="Breadcrumb">
    <ol class="list-none p-0 inline-flex">
      <li v-if="firstLevelPage && firstLevelPage.length > 0" class="flex items-center">
        <a href="#">{{ firstLevelPage }}</a>
      </li>
      <li v-if="secondLevelPage && secondLevelPage.length > 0" class="flex items-center">
        <span class="mx-1"><fa icon="chevron-right" /></span>
        <a href="#">{{ secondLevelPage }}</a>
      </li>
      <li v-if="thirdLevelPage && thirdLevelPage.length > 0">
        <span class="mx-1"><fa icon="chevron-right" /></span>
        <a href="#" class="text-gray-500" aria-current="page">{{ thirdLevelPage }}</a>
      </li>
    </ol>
  </nav>
</template>
