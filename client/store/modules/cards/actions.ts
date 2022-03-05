import { questionCardService, responseCardService } from '@/services';
import { QuestionCardDTO, ResponseCardDTO } from '@/models/card';

const actions: { [key: string]: Function } = {
  loadQuestionCards(context: any) {
    questionCardService.findAll().then((response) => context.commit('setQuestionCards', response.data.documents));
  },
  loadResponseCards(context: any) {
    responseCardService.findAll().then((response) => context.commit('setResponseCards', response.data.documents));
  },
  updateQuestionCards(context: any, payload: QuestionCardDTO) {
    const card = { ...payload };
    delete card._id;
    questionCardService.update(String(payload._id), card);
  },
  updateResponseCards(context: any, payload: ResponseCardDTO) {
    const card = { ...payload };
    delete card._id;
    responseCardService.update(String(payload._id), card);
  },
};

export default actions;
