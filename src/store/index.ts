import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import vuex from 'vuex';

const store = new vuex.Store({
  state,
  // @ts-ignore
  getters,
  // @ts-ignore
  mutations,
  // @ts-ignore
  actions,
});

export default store;
