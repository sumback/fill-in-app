import { FirebaseArray } from '@/models/entity';
import { IGame, IGamePlayer, IGameProposal } from '@/models/games';
import { gamesService } from '@/services';
import { GameState } from '@/models/game-state';
import { UserDTO } from '@/models/user';
import { QuestionCardDTO, ResponseCardDTO } from '@/models/card';

const actions: { [key: string]: Function } = {
  setGames(context: any, payload: FirebaseArray<IGame>) {
    context.commit('setGames', payload);
  },
  addGame(
    context: any,
    payload: { host: UserDTO; questionCards: QuestionCardDTO[]; responseCards: ResponseCardDTO[] },
  ) {
    gamesService.addGame(payload.host, payload.questionCards, payload.responseCards);
  },
  addPlayer(context: any, payload: { id: string; player: UserDTO }) {
    gamesService.addPlayer(payload.id, payload.player);
  },
  addProposal(context: any, payload: { gameId: string; proposalId: string; proposal: IGameProposal }) {
    gamesService.addProposal(payload.gameId, payload.proposalId, payload.proposal);
  },
  deleteGame(context: any, id: string) {
    gamesService.deleteOne(id);
  },
  updatePlayers(context: any, payload: { id: string; players: FirebaseArray<IGamePlayer> }) {
    gamesService.updatePlayers(payload.id, payload.players);
  },
  updateState(context: any, payload: { id: string; state: GameState }) {
    gamesService.updateState(payload.id, payload.state);
  },
  drawResponseCards(context: any, payload: { id: string; game: IGame }) {
    gamesService.updateResponseCards(payload.id, gamesService.drawResponseCards(payload.game));
  },
  saveProposal(context: any, payload: { id: string; game: IGame; player: string }) {
    gamesService.addLastProposalSelected(payload.id, {
      player: payload.player,
      ...payload.game.proposals[payload.player],
    });
  },
  resetProposals(context: any, payload: { id: string; game: IGame }) {
    gamesService.updateQuestionCards(payload.id, gamesService.discardProposalQuestionCard(payload.game));
    gamesService.updateResponseCards(payload.id, gamesService.discardProposalResponseCards(payload.game));
    gamesService.updateResponseCards(payload.id, gamesService.drawResponseCards(payload.game));
    gamesService.resetProposals(payload.id);
    gamesService.addProposal(payload.id, 'default', {
      question: Object.keys(gamesService.drawQuestionCard(payload.game))[0],
      responses: [],
    });
  },
};

export default actions;
