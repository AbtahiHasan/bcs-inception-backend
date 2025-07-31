import { Router } from "express";
import { auth_controllers } from "./auth.controllers";
import { validate_request } from "../../middlewares/validate-request";
import { auth_validators } from "./auth.validators";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/register-user",
  validate_request(auth_validators.register_user),
  auth_controllers.register_user
);
router.post("/login-user", auth_controllers.login_user);
router.get(
  "/me",
  auth(["student", "admin", "super_admin"]),
  validate_request(auth_validators.assess_token),
  auth_controllers.get_me
);
router.get(
  "/refresh-token",
  validate_request(auth_validators.refresh_token),
  auth_controllers.refresh_token
);
router.put(
  "/update-info",
  auth(["student", "admin", "super_admin"]),
  validate_request(auth_validators.change_auth_info),

  auth_controllers.change_auth_info
);
router.post(
  "/logout",
  auth(["student", "admin", "super_admin"]),

  auth_controllers.logout
);

export const auth_routes = router;
