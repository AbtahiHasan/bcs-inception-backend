import { Router } from "express";
import auth from "../../middlewares/auth";
import { validate_request } from "../../middlewares/validate-request";
import { subscription_controllers } from "./subscription.controllers";
import { subscription_validators } from "./subscription.validators";

const router = Router();

router.post(
  "/create",
  auth(["student", "super_admin"]),
  validate_request(subscription_validators.create_subscription),
  subscription_controllers.create_subscription
);
router.get(
  "/my",
  auth(["student", "admin", "super_admin"]),
  subscription_controllers.get_my_subscriptions_history
);
router.get(
  "/",
  auth(["admin", "super_admin"]),
  subscription_controllers.get_subscriptions
);
router.put(
  "/status/:id",
  auth(["admin", "super_admin"]),
  subscription_controllers.update_status
);

export const subscription_routes = router;
