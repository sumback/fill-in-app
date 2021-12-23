<script setup lang="ts">
import { useStore } from 'vuex';
import BlobScene from '@/assets/svg/blob-scene-haikei.svg?component';

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Error', secondLevelPage: '401' });
</script>

<!-- TODO: mobile, svg size -->
<template>
  <div class="container mx-auto my-5">
    <div class="relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2 bg-white">
      <div class="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
        <div class="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom">
          <blob-scene />
        </div>

        <div class="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
          <h4 class="w-full text-xl text-gray-100 leading-tight">{{ $t('unauthorized.title') }}</h4>
        </div>
        <svg class="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
      </div>

      <div class="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
        <div class="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
          <h3 class="hidden md:block font-bold text-2xl text-gray-700">{{ $t('unauthorized.title') }}</h3>
          <p class="text-gray-600 text-justify">
            <span>{{ $t('unauthorized.detail1') }}</span>
            <span><br />{{ $t('unauthorized.detail2') }}</span>
          </p>
          <button
            class="m-2 bg-indigo-500 font-semibold text-white px-5 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
            @click="$router.push({ name: 'sign-in' })">
            <span class="pr-5">{{ $t('unauthorized.button') }}</span>
            <fa icon="arrow-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
