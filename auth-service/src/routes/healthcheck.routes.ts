import { Router } from "express";
import { healthchecktHandler } from "../controllers/Healthcheck.controller";

const router = Router()

router.get('/', healthchecktHandler)

export default router