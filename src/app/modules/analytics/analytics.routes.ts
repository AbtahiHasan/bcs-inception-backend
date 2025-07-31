import { Router } from "express";
import auth from "../../middlewares/auth";
import { analytics_controllers } from "./analytics.controllers";

const router = Router();

router.get(
  "/",
  auth(["admin", "super_admin"]),
  analytics_controllers.get_analytics
);

export const analytics_routes = router;
