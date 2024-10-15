import { Router } from "express";
const router: Router = Router();
import multer from "multer";

import * as controller from "../../controllers/admin/upload.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewre"; //Viết như này để dễ hiểu hơn

const upload = multer();

router.post("/", 
  upload.single('file'),
  uploadCloud.uploadSingle,
  controller.index
);

export const uploadRoutes: Router = router;
