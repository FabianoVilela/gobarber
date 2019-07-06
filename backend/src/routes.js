import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import UploadController from './app/controllers/UploadController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Valido somente para as rodas que estão abaixo
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);

routes.post('/uploads', upload.single('file'), UploadController.store);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

export default routes;
