import { Router } from 'express';
import ServerRouter from './server/server.routes';

const routes = Router();

routes.use('/server', ServerRouter)

export default routes;