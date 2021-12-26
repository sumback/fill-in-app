import { questionCardService, responseCardService } from '@/services';

const actions: { [key: string]: Function } = {
  loadQuestionCards(context: any) {
    questionCardService.findAll().then((response) => context.commit('setQuestionCards', response.data.documents));
  },
  loadResponseCards(context: any) {
    responseCardService.findAll().then((response) => context.commit('setResponseCards', response.data.documents));
  },
};

export default actions;
