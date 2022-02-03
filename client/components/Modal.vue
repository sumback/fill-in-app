<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const open = computed<boolean>(() => store.getters['isOpen']);
const closable = computed<boolean>(() => store.getters['isClosable']);
const title = computed<string | undefined>(() => store.getters['getTitle']);
const content = computed<any | undefined>(() => store.getters['getContent']);

function close() {
  store.dispatch('closeModal');
}
function clickOutside() {
  if (closable.value) {
    store.dispatch('closeModal');
  }
}
</script>

<template>
  <div v-if="open" class="pointer-events-auto p-7 flex justify-center fixed left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 items-start overflow-x-hidden overflow-y-auto" @click="clickOutside">
    <div class="bg-gray-200 flex rounded-lg w-full sm:w-2/3 md:w-1/2 relative">
      <div class="flex flex-col items-start w-full">
        <div class="p-7 flex items-center justify-between w-full">
          <div class="text-gray-900 font-bold text-lg">{{ title }}</div>
          <div v-if="closable" @click="close">
            <fa icon="times" class="cursor-pointer" />
          </div>
        </div>

        <component :is="content"></component>
      </div>
    </div>
  </div>
</template>
