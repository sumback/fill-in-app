<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const locale = useI18n().locale;
const store = useStore();

store.dispatch('setPage', { firstLevelPage: 'Parameter' });
</script>

<template>
  <div class="flex items-center justify-center px-5 py-5">
    <div class="w-full lg:w-9/12 bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
      <div class="md:flex w-full">
        <div class="w-full py-10 px-5 md:px-10">
          <ul>
            <li class="text-xs uppercase text-gray-400 border-b border-gray border-solid py-2 px-5 mb-2">
              {{ $t('parameter.global') }}
            </li>
            <li class="grid grid-cols-10 gap-4 justify-center items-center cursor-pointer px-4 py-2 rounded-lg">
              <div class="flex">
                <span class="text-left text-xl">{{ $t('parameter.language') }}</span>
              </div>
              <div class="col-start-6 col-end-11 pl-8 border-l-2 border-solid border-gray">
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
