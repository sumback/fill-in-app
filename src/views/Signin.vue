<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { compare } from 'bcryptjs';
import LowPolyGrid from '@/assets/svg/low-poly-grid-haikei.svg?component';
import EllipsisLoading from '@/assets/svg/ellipsis-loading.svg?component';

const store = useStore();
const router = useRouter();
store.dispatch('setPage', { firstLevelPage: 'Sign in' });

const pseudo = ref(undefined);
const password = ref(undefined);
const isSubmitting = ref(false);
const loginFail = ref(false);

function signIn() {
  isSubmitting.value = true;
  loginFail.value = false;
  store.dispatch('signIn', {pseudo: pseudo.value, password: password.value}).then(
    (response) => checkPassword(response.data.document),
    () => router.push({ name: '400' }),
  );
}

async function checkPassword(data) {
  if (data && data.password && await compare(password.value, data.password)) {
    store.dispatch('login', data);
    await router.push({ name: 'home' });
  } else {
    isSubmitting.value = false;
    loginFail.value = true;
  }
}
</script>

<template>
  <div class="flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width: 1000px">
      <div class="md:flex w-full">
        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900">{{ $t('signin.title') }}</h1>
            <p>{{ $t('signin.subtitle') }}</p>
          </div>

          <form @submit.prevent="signIn">
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <label for="pseudo" class="text-xs font-semibold px-1">{{ $t('common.pseudo') }}</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <fa icon="user-circle" class="mdi mdi-email-outline text-gray-400 text-lg" />
                  </div>
                  <input id="pseudo" v-model="pseudo" type="text" :disabled="isSubmitting" required class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith" />
                </div>
              </div>
            </div>

            <div class="flex -mx-3">
              <div class="w-full px-3 mb-6">
                <label for="password" class="text-xs font-semibold px-1">{{ $t('common.password') }}</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <fa icon="lock" class="mdi mdi-lock-outline text-gray-400 text-lg" />
                  </div>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    :disabled="isSubmitting"
                    required
                    class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="************" />
                </div>
              </div>
            </div>

            <div v-if="loginFail" class="flex -mx-3">
              <div class="block w-full px-3 mb-5 text-center">
                <p class="mx-auto text-red-500 text-xs italic">{{ $t('signin.error') }}</p>
              </div>
            </div>

            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="block w-full max-w-xs mx-auto bg-indigo-500 font-semibold text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300">
                  <ellipsis-loading v-if="isSubmitting" types="vite-svg-loader" class="h-6" />
                  <span v-if="!isSubmitting">{{ $t('signin.button') }}</span>
                </button>

                <p class="text-center mt-2">
                  <span class="pr-1">{{ $t('signin.hyperlink.prefix') }}</span>
                  <router-link :to="{ name: 'sign-up' }" class="underline cursor-pointer text-indigo-500">
                    {{ $t('signin.hyperlink.suffix') }}
                  </router-link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div class="hidden md:block w-1/2 bg-indigo-500 flex">
          <div class="max-h-20 flex">
            <low-poly-grid types="vite-svg-loader" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
