const actions: { [key: string]: Function } = {
  setPage(context: any, payload: { firstLevelPage: string; secondLevelPage: string; thirdLevelPage: string }) {
    context.commit('setFirstLevelPage', payload.firstLevelPage);
    context.commit('setSecondLevelPage', payload.secondLevelPage);
    context.commit('setThirdLevelPage', payload.thirdLevelPage);
  },
};

export default actions;
