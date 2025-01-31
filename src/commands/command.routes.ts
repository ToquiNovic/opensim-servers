import { Router } from "express";
import controller from "./command.controller";
import { getOs } from "../utils/os";

const CommandRouter = Router();

CommandRouter.post('/init', controller.init)
CommandRouter.post('/create', controller.createUser)

CommandRouter.put('/start', controller.start)
CommandRouter.put('/stop', controller.stop)

CommandRouter.get('/status', (req, res) => {
    const os = getOs()

    console.log(os)
    res.send('Command status')
})

export default CommandRouter;