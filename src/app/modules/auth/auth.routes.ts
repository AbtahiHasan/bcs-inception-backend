import { Router } from "express";
import { auth_controllers } from "./auth.controllers";
import { validate_request } from "../../middlewares/validate-request";
import { auth_validators } from "./auth.validators";

const router = Router();

router.post(
  "/register-user",
  validate_request(auth_validators.register_user),
  auth_controllers.register_user
);
router.post("/login-user", auth_controllers.login_user);

export const auth_routes = router;
