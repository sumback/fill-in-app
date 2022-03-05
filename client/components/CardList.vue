<script setup lang="ts">
import { computed, defineAsyncComponent, ref, useAttrs } from 'vue';
import { useStore } from 'vuex';
import { CardListAttrs } from '@/models/attrs';
import { IPlayCard } from '@/models/card';
import { CardState } from '@/models/card-state';

const EllipsisLoading = defineAsyncComponent(() => import('@/assets/svg/ellipsis-loading.svg'));
const Pagination = defineAsyncComponent(() => import('@/components/Pagination.vue'));

const store = useStore();
const attrs = <CardListAttrs>useAttrs();

const sortKey = ref(undefined);
const currentPage = ref(1);
const perPage = ref(10);
const pageRange = ref(2);

const total = computed(() => sortedList.value.length);
const sortedList = computed(() => updateList(attrs.items, sortKey.value));

function updateList(items: Array<IPlayCard>, key: string | undefined): Array<IPlayCard> {
  return items.filter((item) => sortByKey(item, key));
}

function sortByKey(item: IPlayCard, key: string | undefined) {
  return !key || (item.response && item.response.toLowerCase().includes(key.toLowerCase())) || (item.question && item.question.toLowerCase().includes(key.toLowerCase()));
}

function displayRow(index: number) {
  return index + 1 > (currentPage.value - 1) * perPage.value && index + 1 <= currentPage.value * perPage.value;
}

function disable(item: IPlayCard) {
  item.state = CardState.DISABLED;
  update(item);
}

function update(item: IPlayCard) {
  delete item.edit;
  if (item.question) {
    store.dispatch('updateQuestionCards', item);
  } else if (item.response) {
    store.dispatch('updateResponseCards', item);
  }
}
</script>

<template>
  <div class="container mx-auto py-6 px-4">
    <h1 class="text-2xl text-gray-400 border-b border-gray border-solid">{{ attrs.title }}</h1>
  </div>

  <div v-if="attrs.items && attrs.items.length > 0" class="flex-1 pr-4 mb-3">
    <div class="flex md:w-1/3">
      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
        <fa icon="search" class="w-6 h-6 text-gray-400" />
      </div>
      <input v-model="sortKey" type="search" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" :placeholder="$t('common.search') + '...'" />
    </div>
  </div>

  <table v-if="attrs.items && attrs.items.length > 0" class="w-full table-auto border-2">
    <thead>
      <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th class="py-3 px-6 text-left w-full md:w-10/12">{{ $t('cards.card') }}</th>
        <th class="py-3 px-6 text-center hidden md:table-cell md:w-1/12">{{ $t('common.status') }}</th>
        <th class="py-3 px-6 text-center hidden md:table-cell md:w-1/12">{{ $t('common.actions') }}</th>
      </tr>
    </thead>

    <tbody class="text-gray-600 text-sm font-light overflow-auto max-h-36">
      <tr v-for="(item, index) in sortedList" :key="index" :class="{ 'bg-gray-50': index % 2 === 0, 'border-gray-200': index % 2 !== 0 }" class="border-b hover:bg-gray-100">
        <td v-if="displayRow(index)" class="py-3 px-6 text-left">
          <div v-if="!item.edit" class="flex items-center">
            <span v-if="item.response" class="font-medium">{{ item.response }}</span>
            <span v-if="item.question" class="font-medium">
              <span class="badge mb-3 bg-gray-400 rounded-full px-2 py-1 text-center object-right-top text-white text-sm mr-1 hidden sm:inline">{{ item.nbResponse }}</span>
              <span>{{ item.question }}</span>
            </span>
          </div>
          <div v-if="item.edit" class="flex items-center">
            <input v-if="item.response !== undefined" id="response" v-model="item.response" type="text" class="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
            <input v-if="item.nbResponse !== undefined" id="nbResponse" v-model="item.nbResponse" type="number" min="1" max="3" class="w-12 pl-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
            <input v-if="item.question !== undefined" id="question" v-model="item.question" type="text" class="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
          </div>
        </td>
        <td v-if="displayRow(index)" class="py-3 px-6 text-center hidden md:table-cell whitespace-nowrap">
          <span v-if="item.state === CardState.ACTIVE" class="bg-indigo-200 text-indigo-600 py-1 px-3 rounded-full text-xs">{{ $t('cards.status.active') }}</span>
          <span v-if="item.state !== CardState.ACTIVE && item.edit" class="bg-indigo-200 text-indigo-600 py-1 px-3 rounded-full text-xs" @click="item.state = CardState.ACTIVE"></span>
          <span v-if="item.state === CardState.PENDING" class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{{ $t('cards.status.pending') }}</span>
          <span v-if="item.state !== CardState.PENDING && item.edit" class="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs" @click="item.state = CardState.PENDING"></span>
          <span v-if="item.state === CardState.DISABLED" class="bg-gray-400 text-white py-1 px-3 rounded-full text-xs">{{ $t('cards.status.disabled') }}</span>
          <span v-if="item.state !== CardState.DISABLED && item.edit" class="bg-gray-200 text-white py-1 px-3 rounded-full text-xs" @click="item.state = CardState.DISABLED"></span>
        </td>
        <td v-if="displayRow(index)" class="py-3 px-6 text-center hidden md:table-cell">
          <div class="flex item-center justify-center">
            <div v-if="!item.edit" class="w-4 mr-2 transform hover:text-indigo-500 hover:scale-110 cursor-pointer" @click="item.edit = true">
              <fa icon="pencil-alt" />
            </div>
            <div v-if="item.edit" class="w-4 mr-2 transform hover:text-indigo-500 hover:scale-110 cursor-pointer" @click="update(item)">
              <fa icon="save" />
            </div>
            <div v-if="!item.edit && item.state !== CardState.DISABLED" class="w-4 mr-2 transform hover:text-indigo-500 hover:scale-110 cursor-pointer" @click="disable(item)">
              <fa icon="trash-alt" />
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="sortedList.length === 0">
        <td class="py-3 px-6 text-left font-medium w-6/6" colspan="2">{{ $t('cards.search.empty') }}</td>
      </tr>
    </tbody>
  </table>

  <div v-if="attrs.items && attrs.items.length > 0">
    <pagination :current="currentPage" :total="total" :perpage="perPage" :pagerange="pageRange" @change="currentPage = $event" />
  </div>

  <div v-if="!attrs.items || attrs.items.length === 0" class="flex-1 pr-4 mb-3">
    <ellipsis-loading class="h-10" />
  </div>
</template>
