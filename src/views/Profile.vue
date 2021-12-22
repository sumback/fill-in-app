<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
store.dispatch('setPage', { firstLevelPage: 'Profile' });
const currentUser = computed(() => store.getters['getCurrentUser']);
</script>

<!-- TODO update profile missing-->
<template>
  <div class="w-full lg:w-4/12 px-4 mx-auto">
    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
      <div class="px-6">
        <div class="text-center mt-12">
          <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">{{ currentUser.pseudo }}</h3>
          <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
            {{ currentUser.firstName }} {{ currentUser.lastName }}
          </div>
        </div>

        <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-9/12 px-4">
              <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                <!-- TODO add "About Me" -->
              </p>
              <button class="m-2 bg-indigo-500 font-semibold text-white px-5 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300">
                <fa icon="pen" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
