import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Valido somente para as rodas que estão abaixo
routes.put('/users', UserController.update);

routes.post('/uploads', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
