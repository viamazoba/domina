import { Router } from "express";
import { healthchecktHandler } from "../controllers/healthcheck.controller";

const router = Router()

router.get('/', healthchecktHandler)

export default router