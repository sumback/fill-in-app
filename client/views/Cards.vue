<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
const CardList = defineAsyncComponent(() => import('@/components/CardList.vue'));

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Cards' });

const questionCards = computed(() => store.getters['getQuestionCards']);
const responseCards = computed(() => store.getters['getResponseCards']);

if (!questionCards.value) {
  store.dispatch('loadQuestionCards');
}
if (!responseCards.value) {
  store.dispatch('loadResponseCards');
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full lg:w-9/12 py-5 px-5 bg-gray-100 rounded-2xl shadow-xl z-20">
      <card-list :title="$t('cards.question')" :items="questionCards" />
      <card-list :title="$t('cards.response')" :items="responseCards" />
    </div>
  </div>
</template>
