<script setup lang="ts">
    import { useStore } from 'vuex';

    const store = useStore();
    store.dispatch('setPage', { firstLevelPage: 'In game' });
</script>

<template>
    <div class="flex items-center justify-center px-5 py-5">
        <div class="w-full lg:w-9/12 py-5 px-5 bg-gray-100 rounded-2xl shadow-xl z-20">

        </div>
    </div>
</template>
