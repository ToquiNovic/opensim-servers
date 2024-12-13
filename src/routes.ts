import { Router } from "express";
import serverRoutes from '@/server/server.routes'

const router = Router();


router.use('/server', serverRoutes)
router.use('/prueba', (req, res) => {
    res.send('Hello, World!')
})


export default router;