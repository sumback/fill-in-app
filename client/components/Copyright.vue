<template>
  <div class="flex flex-wrap items-center md:justify-between justify-center">
    <div class="w-full md:w-4/12 px-4 mx-auto text-center">
      <div class="text-sm text-gray-700 font-semibold py-1">
        <span class="mr-1">{{ $t('copyright') }}</span>
        <span id="get-current-year" class="mr-1">{{ new Date().getFullYear() }}</span>
        <a href="https://github.com/sumback/fill-in-app" class="mr-1 text-blueGray-500 hover:text-indigo-500" target="_blank">{{ $t('common.app') }}</a>
        <span class="mr-1">{{ $t('common.by') }}</span>
        <a href="https://github.com/sumback" class="mr-1 text-blueGray-500 hover:text-indigo-500">@{{ $t('common.sumback') }}</a>
      </div>
    </div>
  </div>
</template>
