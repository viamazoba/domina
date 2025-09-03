import { Router } from "express";
import { healthChecktHandler } from "../controllers/Healthcheck.controller";

const router = Router()

router.get('/', healthChecktHandler)

export default router