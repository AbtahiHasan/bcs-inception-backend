import { Router } from "express";
import auth from "../../middlewares/auth";

import { user_controllers } from "./user.controllers";
import { validate_request } from "../../middlewares/validate-request";
import { user_validators } from "./user.validators";

const router = Router();

router.get("/", auth(["admin", "super-admin"]), user_controllers.get_users);

router.put(
  "/update-role",
  auth(["super-admin"]),
  validate_request(user_validators.update_user_role),
  user_controllers.update_user_role
);

export const user_routes = router;
