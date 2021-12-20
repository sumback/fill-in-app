<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const locale = useI18n().locale;
const store = useStore();

store.dispatch('setPage', { firstLevelPage: 'Parameter' });
</script>

<template>
  <div class="grid grid-cols-3 gap-5 py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
    <div class="text-right">
      <button class="bg-blue-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
        <fa icon="language" />
      </button>
    </div>

    <span class="text-left text-xl">{{ $t('language') }}</span>

    <div class="text-gray-500 text-center align-middle">
      <span :class="{ 'text-blue-500': locale === 'en' }" class="text-md font-semibold m-1">EN</span>
      <button v-if="locale === 'fr'" class="text-blue-500 text-2xl" @click="locale = 'en'">
        <fa icon="toggle-on" />
      </button>
      <button v-if="locale === 'en'" class="text-2xl" @click="locale = 'fr'">
        <fa icon="toggle-off" />
      </button>
      <span :class="{ 'text-blue-500': locale === 'fr' }" class="text-md font-semibold m-1">FR</span>
    </div>
  </div>
</template>
