import { Router } from 'express';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

// lógica para invocar middleware em todas as rotas seguintes
routes.use(authMiddleware)
routes.get('/auth', UserController.index);
routes.put('/user', UserController.update);



export default routes;