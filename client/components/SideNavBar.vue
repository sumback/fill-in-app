<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const FiHandwriting = defineAsyncComponent(() => import('@/assets/svg/fi-handwriting-generator.svg'));

const store = useStore();
const router = useRouter();
const currentUser = computed(() => store.getters['getCurrentUser']);

function logout() {
  store.dispatch('logout');
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="h-16 flex items-center w-full">
    <div class="w-10 md:w-16 mt-4 mx-auto">
      <router-link :to="{ name: 'home' }">
        <fi-handwriting />
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
    <li v-if="currentUser" class="hover:bg-gray-100">
      <router-link :to="{ name: 'card-list' }">
        <span class="h-16 px-6 flex justify-center items-center w-full focus:text-indigo-500">
          <fa icon="th-list" />
        </span>
      </router-link>
    </li>
    <li v-if="currentUser" class="hover:bg-gray-100">
      <router-link :to="{ name: 'games' }">
        <span class="h-16 px-6 flex justify-center items-center w-full focus:text-indigo-500">
          <fa icon="gamepad" />
        </span>
      </router-link>
    </li>
    <li v-if="currentUser" class="hover:bg-gray-100">
      <div @click="logout()">
        <span class="h-16 px-6 flex justify-center items-center w-full text-red-400">
          <fa icon="sign-out-alt" />
        </span>
      </div>
    </li>
  </ul>

  <div class="mt-auto h-16 flex items-center w-full">
    <router-link :to="{ name: 'parameter' }" class="h-16 mx-auto flex justify-center items-center w-full focus:text-indigo-500 hover:bg-gray-200 focus:outline-none">
      <fa icon="cog" />
    </router-link>
  </div>
</template>
