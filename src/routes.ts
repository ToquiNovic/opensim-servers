import { Router } from 'express';
import ServerRouter from './server/server.routes';
import CommandRouter from './commands/command.routes';

const routes = Router();

routes.use('/server', ServerRouter)
routes.use('/command', CommandRouter)

export default routes;