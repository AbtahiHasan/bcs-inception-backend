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
router.get(
  "/me",
  validate_request(auth_validators.assess_token),
  auth_controllers.get_me
);
router.get(
  "/refresh_token",
  validate_request(auth_validators.refresh_token),
  auth_controllers.refresh_token
);

export const auth_routes = router;
