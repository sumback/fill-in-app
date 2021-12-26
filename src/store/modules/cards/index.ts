import { Module } from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const cardsModule: Module<any, any> = {
  state,
  // @ts-ignore
  getters,
  // @ts-ignore
  mutations,
  // @ts-ignore
  actions,
};

export default cardsModule;
