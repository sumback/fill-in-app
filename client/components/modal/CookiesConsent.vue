<script setup lang="ts">
import Cookies from 'js-cookie';
import { defineAsyncComponent, ref } from 'vue';
import { useStore } from 'vuex';
const Cookie = defineAsyncComponent(() => import('@/assets/svg/cookie-svgrepo.svg'));

const store = useStore();
const isSubmitting = ref(false);

function consent() {
  isSubmitting.value = true;
  Cookies.set('cookiesConsent', String('true'), { expires: 7 });
  store.dispatch('closeModal');
}
</script>

<template>
  <div class="px-7 flex w-full">
    <div class="w-1/6 hidden md:flex justify-center">
      <cookie class="h-16 m-auto" />
    </div>
    <div class="w-full md:w-5/6 text-justify">
      <p>
        <span class="font-bold text-gray-700">{{ $t('modal.cookies.detail1') }}</span>
        <br />{{ $t('modal.cookies.detail2') }}<br />{{ $t('modal.cookies.detail3') }}
      </p>
      <p class="mt-2 text-gray-900">
        {{ $t('modal.cookies.detail4') }}
        <br />{{ $t('modal.cookies.detail5') }}<br />{{ $t('modal.cookies.detail6') }}
      </p>
    </div>
  </div>
  <div class="p-7 flex justify-end items-center w-full">
    <button
      :disabled="isSubmitting"
      class="block w-full max-w-xs mx-auto bg-indigo-500 font-semibold text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
      @click="consent()">
      <ellipsis-loading v-if="isSubmitting" class="h-6" />
      <span v-if="!isSubmitting">{{ $t('modal.cookies.button') }}</span>
    </button>
  </div>
</template>
