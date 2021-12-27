import Http from './http';
import UserService from './user-service';
import QuestionCardService from './question-card-service';
import ResponseCardService from './response-card-service';

const httpService = new Http({
  baseURL: '/api/',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': import.meta.env.VITE_API_MONGO_KEY,
  },
});

export const userService = new UserService(httpService);
export const questionCardService = new QuestionCardService(httpService);
export const responseCardService = new ResponseCardService(httpService);
