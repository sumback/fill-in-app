<template>
  <div class="h-16 flex items-center w-full">
    <div class="h-6 w-6 mx-auto">
      <router-link :to="{ name: 'home' }">
        <img class="h-6 w-6 mx-auto" src="" alt="logo" />
      </router-link>
    </div>
  </div>

  <div class="mt-auto h-16 flex items-center w-full">
    <router-link
      :to="{ name: 'parameter' }"
      class="h-16 w-10 mx-auto flex justify-center items-center w-full focus:text-orange-500 hover:bg-gray-200 focus:outline-none"
    >
      <fa icon="cog" />
    </router-link>
  </div>
</template>
