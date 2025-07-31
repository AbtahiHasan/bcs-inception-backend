import { Router } from "express";
import auth from "../../middlewares/auth";
import { validate_request } from "../../middlewares/validate-request";
import { topic_controllers } from "./topic.controllers";
import { topic_validators } from "./topic.validators";

const router = Router();

router.post(
  "/create",
  auth(["admin", "super_admin"]),
  validate_request(topic_validators.create_topic),
  topic_controllers.create_topic
);
router.get(
  "/",
  auth(["student", "admin", "super_admin"]),
  topic_controllers.get_all_topics
);

export const topic_routes = router;
