<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

const Breadcrumb = defineAsyncComponent(() => import('@/components/Breadcrumb.vue'));
const Copyright = defineAsyncComponent(() => import('@/components/Copyright.vue'));
const SideNavBar = defineAsyncComponent(() => import('@/components/SideNavBar.vue'));
const Modal = defineAsyncComponent(() => import('@/components/Modal.vue'));

const store = useStore();
store.dispatch('autoLogin');
store.dispatch('autoCookiesConsentModal');
</script>

<template>
  <div class="h-screen w-screen flex bg-gray-200">
    <aside class="flex flex-col items-center bg-white text-gray-700 shadow h-full">
      <side-nav-bar />
    </aside>

    <div class="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
      <header class="p-2">
        <breadcrumb />
      </header>

      <main class="p-1 md:p-5 flex-grow justify-center items-center z-0">
        <router-view />
      </main>

      <footer class="p-2">
        <copyright />
      </footer>

      <dialog class="w-screen h-screen flex relative bg-transparent z-0">
        <modal />
      </dialog>
    </div>
  </div>
</template>
