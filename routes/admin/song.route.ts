import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/admin/song.controller'

router.get("/", controller.index);

router.get("/create", controller.create);

export const songRoutes: Router = router;