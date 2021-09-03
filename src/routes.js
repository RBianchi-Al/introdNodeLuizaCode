import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import AppointmentsController from './app/controller/AppointmentsController'
import authMiddleware from './app/middleware/auth';

import UploadController from './app/controller/UploadController';

const routes = new Router();

const upload = multer(multerConfig)

routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);

// lógica para invocar middleware em todas as rotas seguintes
routes.use(authMiddleware)
routes.get('/auth', UserController.index);
routes.put('/user', UserController.update);

routes.post('/appointments', AppointmentsController.store)
routes.post('/files', upload.single('files'), UploadController.store)


export default routes;