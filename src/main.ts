import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import locales from './locales';

createApp(App).use(router).use(store).use(locales).mount('#app');
