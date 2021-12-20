<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue';
import Copyright from '@/components/Copyright.vue';
import SideNavBar from '@/components/SideNavBar.vue';
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

      <main class="p-4 flex-grow justify-center items-center">
        <router-view />
      </main>

      <footer class="p-2">
        <copyright />
      </footer>
    </div>
  </div>
</template>
