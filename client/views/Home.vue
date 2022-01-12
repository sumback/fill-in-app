<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
const FillInHandwriting = defineAsyncComponent(() => import('@/assets/svg/fill-in-handwriting-generator.svg'));

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Home' });
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full lg:w-9/12 p-4 md:p-12 bg-gray-100 rounded-2xl shadow-xl z-20">
      <div class="flex flex-col h-full max-w-lg mx-auto max-h-40">
        <fill-in-handwriting />
      </div>
      <ul>
        <li class="text-xs uppercase text-gray-400 border-b border-gray border-solid py-2 px-5 mb-2">{{ $t('home.game1.rules') }}</li>
        <li class="grid md:grid-cols-10 gap-4 justify-center items-center cursor-default px-4 py-2 rounded-lg hover:bg-gray-50">
          <div class="hidden md:flex justify-center items-center">
            <fa icon="book" class="fa-2x text-indigo-600" />
          </div>

          <div class="md:col-start-2 md:col-end-11 md:pl-8 md:border-l-2 border-solid border-gray">
            <h3 class="text-gray-800 font-semibold text-md">{{ $t('home.game1.block1.title') }}</h3>
            <p class="contents text-gray-600 text-justify mt-1 font-regular text-sm">
              <span>{{ $t('home.game1.block1.detail1') }}</span>
              <span><br />{{ $t('home.game1.block1.detail2') }}</span>
              <span><br />{{ $t('home.game1.block1.detail3') }}</span>
              <span><br />{{ $t('home.game1.block1.detail4') }}</span>
            </p>
          </div>
        </li>

        <li class="grid md:grid-cols-10 gap-4 justify-center items-center cursor-default px-4 py-2 rounded-lg hover:bg-gray-50">
          <div class="hidden md:flex justify-center items-center">
            <fa icon="book" class="fa-2x text-lime-600" />
          </div>

          <div class="md:col-start-2 md:col-end-11 md:pl-8 md:border-l-2 border-solid border-gray">
            <h3 class="text-gray-800 font-semibold text-md">{{ $t('home.game1.block2.title') }}</h3>
            <p class="contents text-gray-600 text-justify mt-1 font-regular text-sm">
              <span>{{ $t('home.game1.block2.detail1') }}</span>
              <span><br />{{ $t('home.game1.block2.detail2') }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
