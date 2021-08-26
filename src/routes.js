import { Router } from 'express';
import UserController from './app/controller/UserController'
const routes = new Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);

export default routes;