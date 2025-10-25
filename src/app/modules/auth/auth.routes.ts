import { Router } from "express";
import auth from "../../middlewares/auth";
import { auth_controllers } from "./auth.controllers";

const router = Router();

router.get(
  "/me",
  auth(["student", "admin", "super_admin"]),

  auth_controllers.get_me
);

export const auth_routes = router;
