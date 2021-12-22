<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import FiHandwriting from '@/assets/svg/fi-handwriting-generator.svg?component';

const store = useStore();
const currentUser = computed(() => store.getters['getCurrentUser']);
</script>

<template>
  <div class="h-16 flex items-center w-full">
    <div class="w-10 md:w-16 mt-4 mx-auto">
      <router-link :to="{ name: 'home' }">
        <fi-handwriting types="vite-svg-loader" />
      </router-link>
    </div>
  </div>

  <ul>
    <li v-if="!currentUser" class="hover:bg-gray-100">
      <router-link :to="{ name: 'sign-in' }">
        <span class="h-16 px-6 flex justify-center items-center w-full focus:text-indigo-500">
          <fa icon="sign-in-alt" />
        </span>
      </router-link>
    </li>
    <li v-if="currentUser" class="hover:bg-gray-100">
      <router-link :to="{ name: 'profile' }">
        <span class="h-16 px-6 flex justify-center items-center w-full focus:text-indigo-500">
          <fa icon="user-circle" />
        </span>
      </router-link>
    </li>
  </ul>

  <div class="mt-auto h-16 flex items-center w-full">
    <router-link :to="{ name: 'parameter' }" class="h-16 mx-auto flex justify-center items-center w-full focus:text-indigo-500 hover:bg-gray-200 focus:outline-none">
      <fa icon="cog" />
    </router-link>
  </div>
</template>
