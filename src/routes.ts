import { Router } from "express";
import serverRoutes from './server/server.routes'

const router = Router();

router.use('/server', serverRoutes)

export default router;