import vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import cardsModule from './modules/cards';
import gamesModule from './modules/games';
import modalModule from './modules/modal';
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
    cards: cardsModule,
    games: gamesModule,
    modal: modalModule,
    users: usersModule,
  },
});

export default store;
