import { Router } from "express";
import serverController from "./server.controller";

const router = Router();

router.get('/', serverController.listServers)
router.post('/', serverController.createServer)
router.put('/:serverName', serverController.startServer)
router.put('/start/:serverName', serverController.startServer)
router.delete('/:serverName', serverController.deleteServer)

export default router;