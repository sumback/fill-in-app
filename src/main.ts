import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import locales from './locales';
import './assets/css/index.css';

library.add(fas);

createApp(App).use(router).use(store).use(locales).component('fa', FontAwesomeIcon).mount('#app');
