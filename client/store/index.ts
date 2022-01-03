import vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import usersModule from './modules/users';
import gamesModule from './modules/games';
import cardsModule from './modules/cards';

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
    games: gamesModule,
    cards: cardsModule,
  },
});

export default store;
