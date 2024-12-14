import { Router } from "express";
import serverController from "./server.controller";
import { validateResource } from "../middlewares/validateRequest";
import { CreateServerSchema } from "./schema/server.schema";

const router = Router();

router.get('/', serverController.listServers)
router.get('/:gridName', serverController.findOneSever)
router.get('/files/:gridName', serverController.listServerFiles)

router.post('/', validateResource(CreateServerSchema), serverController.createServer)
router.post('/file', serverController.serverFile) // busqueda de un archivo por path 

router.put('/:gridName', serverController.startServer)
router.put('/start/:gridName', serverController.startServer)

router.delete('/:gridName', serverController.deleteServer)

export default router;