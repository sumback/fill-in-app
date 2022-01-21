import Cookies from 'js-cookie';
import { defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';

const actions: { [key: string]: Function } = {
  closeModal(context: any) {
    context.commit('setOpen', false);
    context.commit('setClosable', false);
    context.commit('setTitle', undefined);
    context.commit('setContent', undefined);
  },
  openModal(context: any, payload: { closable: boolean; title: string; content: string }) {
    context.commit('setOpen', true);
    context.commit('setClosable', payload.closable);
    context.commit('setTitle', payload.title);
    context.commit('setContent', payload.content);
  },
  autoCookiesConsentModal(context: any) {
    const i18n = useI18n();
    const cookiesConsent = Cookies.get('cookiesConsent');
    if (!cookiesConsent) {
      context.commit('setOpen', true);
      context.commit('setClosable', false);
      context.commit('setTitle', i18n.t('modal.cookies.title'));
      context.commit(
        'setContent',
        defineAsyncComponent(() => import('@/components/modal/CookiesConsent.vue')),
      );
    }
  },
};

export default actions;
