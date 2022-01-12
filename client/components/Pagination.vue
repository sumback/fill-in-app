<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { PaginationAttrs } from '@/models/attrs';

const attrs = <PaginationAttrs>useAttrs();
const emit = defineEmits(['change']);

const input = ref(undefined);

const totalPages = computed(() => getTotalPages(attrs.total, attrs.perpage));

function changePage(page: number) {
  if (page > 0 && page <= totalPages.value) {
    emit('change', page);
  }
}

function getTotalPages(total: number, perPage: number): number {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages < attrs.current) {
    changePage(totalPages);
  }
  return totalPages;
}

const pages = computed(() => {
  const pages = [];
  for (let i: number = attrs.current - attrs.pagerange; i <= attrs.current + attrs.pagerange; i++) {
    if (i > 0 && i <= totalPages.value) {
      pages.push(i);
    }
  }
  return pages;
});
</script>

<template>
  <div class="min-w-max">
    <section class="flex justify-between p-3 md:px-10 text-gray-700">
      <ul class="flex">
        <li v-if="attrs.current - attrs.pagerange > 1" class="h-8 w-8 mr-1 flex justify-center items-center rounded-full cursor-pointer" @click="changePage(1)">
          <fa icon="angle-double-left" />
        </li>
        <li v-if="attrs.current > 1" class="h-8 w-8 mr-1 flex justify-center items-center rounded-full cursor-pointer" @click="changePage(attrs.current - 1)">
          <fa icon="angle-left" />
        </li>
        <li v-if="attrs.current - attrs.pagerange > 1" class="h-8 w-8 mr-1 hidden md:flex justify-center items-center rounded-full cursor-pointer">...</li>
        <li v-for="(page, index) in pages" :key="index" class="hidden md:flex h-8 font-medium rounded-full" @click="changePage(page)">
          <div :class="{ 'bg-indigo-500 text-white': attrs.current === page }" class="w-8 flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-full">
            {{ page }}
          </div>
        </li>
        <li v-if="attrs.current + attrs.pagerange < totalPages" class="h-8 w-8 mr-1 hidden md:flex justify-center items-center rounded-full cursor-pointer">...</li>
        <li v-if="attrs.current < totalPages" class="h-8 w-8 mr-1 flex justify-center items-center rounded-full cursor-pointer" @click="changePage(attrs.current + 1)">
          <fa icon="angle-right" />
        </li>
        <li v-if="attrs.current + attrs.pagerange < totalPages" class="h-8 w-8 mr-1 flex justify-center items-center rounded-full cursor-pointer" @click="changePage(totalPages)">
          <fa icon="angle-double-right" />
        </li>
      </ul>

      <div class="flex items-center text-gray-400">
        <div class="pr-2 font-medium hidden sm:flex">{{ $t('pagination.goto') }}</div>
        <div class="w-14 md:w-20 px-1 py-1">
          <input v-model="input" type="number" class="w-full pl-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" @keypress.enter="changePage(Number(input))" />
        </div>
        <div class="flex items-center pl-4 font-medium hover:text-indigo-500 cursor-pointer" @click="changePage(Number(input))">
          <fa icon="play" />
        </div>
      </div>
    </section>
  </div>
</template>
