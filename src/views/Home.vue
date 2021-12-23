<script setup lang="ts">
import { useStore } from 'vuex';
import FillInHandwriting from '@/assets/svg/fill-in-handwriting-generator.svg?component';

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Home' });
</script>

<!-- TODO: design -->
<template>
  <div class="flex items-center justify-center px-5 py-5">
    <div class="w-full lg:w-9/12 py-12 px-12 bg-gray-100 rounded-2xl shadow-xl z-20">
      <div class="flex flex-col h-full max-w-lg mx-auto max-h-40">
        <fill-in-handwriting />
      </div>
      <ul>
        <li class="text-xs uppercase text-gray-400 border-b border-gray border-solid py-2 px-5 mb-2">{{ $t('home.game1.rules') }}</li>
        <li class="grid grid-cols-10 gap-4 justify-center items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50">
          <div class="flex justify-center items-center">
            <fa icon="book" class="fa-2x text-indigo-600" />
          </div>
          <div class="col-start-2 col-end-11 pl-8 border-l-2 border-solid border-gray">
            <h3 class="text-gray-900 font-medium text-md">{{ $t('home.game1.block1.title') }}</h3>
            <p class="text-gray-600 text-justify mt-1 font-regular text-sm">
              <span>{{ $t('home.game1.block1.detail1') }}</span>
              <span><br />{{ $t('home.game1.block1.detail2') }}</span>
              <span><br />{{ $t('home.game1.block1.detail3') }}</span>
              <span><br />{{ $t('home.game1.block1.detail4') }}</span>
            </p>
          </div>
        </li>
        <li class="grid grid-cols-10 gap-4 justify-center items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50">
          <div class="flex justify-center items-center">
            <fa icon="book" class="fa-2x text-green-500" />
          </div>
          <div class="col-start-2 col-end-11 pl-8 border-l-2 border-solid border-gray">
            <h3 class="text-gray-900 font-medium text-md">{{ $t('home.game1.block2.title') }}</h3>
            <p class="text-gray-600 text-justify mt-1 font-regular text-sm">
              <span>{{ $t('home.game1.block2.detail1') }}</span>
              <span><br />{{ $t('home.game1.block2.detail2') }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
