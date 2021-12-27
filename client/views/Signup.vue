<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { genSalt, hash } from 'bcryptjs';
import StackedWaves from '@/assets/svg/stacked-waves-haikei.svg?component';
import EllipsisLoading from '@/assets/svg/ellipsis-loading.svg?component';

const store = useStore();
const router = useRouter();
store.dispatch('setPage', { firstLevelPage: 'Sign up' });

const pseudo = ref(undefined);
const firstName = ref(undefined);
const lastName = ref(undefined);
const password = ref(undefined);
const isSubmitting = ref(false);
const pseudoAlreadyExist = ref(false);

function signUp() {
  isSubmitting.value = true;
  pseudoAlreadyExist.value = false;
  checkPseudoAlreadyExist();
}

function checkPseudoAlreadyExist() {
  store.dispatch('checkPseudoToSignUp', { pseudo: pseudo.value }).then(
    (response) => {
      if (response.data.document) {
        isSubmitting.value = false;
        pseudoAlreadyExist.value = true;
      } else {
        createAndRedirect();
      }
    },
    () => router.push({ name: '400' }),
  );
}

async function createAndRedirect() {
  const salt = await genSalt(10);
  const passwordHash = await hash(String(password.value), salt);

  store
    .dispatch('signUp', {
      pseudo: pseudo.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: passwordHash,
    })
    .then(
      //FIXME pseudo is not a props
      () => router.push({ name: 'sign-in', params: { pseudo: pseudo.value } }),
      () => router.push({ name: '400' }),
    );
}
</script>

<template>
  <div class="flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width: 1000px">
      <div class="md:flex w-full">
        <div class="hidden md:block w-1/2 bg-indigo-500 flex">
          <div class="max-h-20 flex">
            <stacked-waves />
          </div>
        </div>

        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900">{{ $t('signup.title') }}</h1>
            <p>{{ $t('signup.subtitle') }}</p>
          </div>

          <form @submit.prevent="signUp">
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <label for="pseudo" class="text-xs font-semibold px-1">{{ $t('common.pseudo') }}</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <fa icon="user-circle" class="mdi mdi-email-outline text-gray-400 text-lg" />
                  </div>
                  <input id="pseudo" v-model="pseudo" type="text" :disabled="isSubmitting" required class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="JohnsDoe" />
                </div>
                <p v-if="pseudoAlreadyExist" class="text-red-500 text-xs italic">{{ $t('signup.error') }}</p>
              </div>
            </div>

            <div class="flex -mx-3">
              <div class="w-1/2 px-3 mb-5">
                <label for="firstname" class="text-xs font-semibold px-1">{{ $t('common.firstname') }}</label>
                <div class="flex">
                  <input id="firstname" v-model="firstName" type="text" :disabled="isSubmitting" class="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" />
                </div>
              </div>

              <div class="w-1/2 px-3 mb-5">
                <label for="lastname" class="text-xs font-semibold px-1">{{ $t('common.lastname') }}</label>
                <div class="flex">
                  <input id="lastname" v-model="lastName" type="text" :disabled="isSubmitting" class="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Doe" />
                </div>
              </div>
            </div>

            <div class="flex -mx-3">
              <div class="w-full px-3 mb-12">
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

            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="block w-full max-w-xs mx-auto bg-indigo-500 font-semibold text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300">
                  <ellipsis-loading v-if="isSubmitting" class="h-6" />
                  <span v-if="!isSubmitting">{{ $t('signup.button') }}</span>
                </button>

                <p class="text-center mt-2">
                  <span class="pr-1">{{ $t('signup.hyperlink.prefix') }}</span>
                  <router-link :to="{ name: 'sign-in' }" class="underline cursor-pointer text-indigo-500">
                    {{ $t('signup.hyperlink.suffix') }}
                  </router-link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
