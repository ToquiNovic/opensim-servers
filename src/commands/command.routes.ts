import { Router } from "express";
import controller from "./command.controller";

const CommandRouter = Router();

CommandRouter.post('/init', controller.init)
CommandRouter.post('/create', controller.createUser)

CommandRouter.put('/start', controller.start)
CommandRouter.put('/stop', controller.stop)


export default CommandRouter;