import vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import usersModule from './modules/users';

const store = new vuex.Store({
  state,
  // @ts-ignore
  getters,
  // @ts-ignore
  mutations,
  // @ts-ignore
  actions,
  modules: {
    users: usersModule,
  },
});

export default store;
