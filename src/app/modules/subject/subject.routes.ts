import { Router } from "express";
import auth from "../../middlewares/auth";
import { validate_request } from "../../middlewares/validate-request";
import { subject_controllers } from "./subject.controllers";
import { subject_validators } from "./subject.validators";

const router = Router();

router.post(
  "/create",
  auth(["admin", "super_admin"]),
  validate_request(subject_validators.create_subject),
  subject_controllers.create_subject
);
router.get(
  "/",
  auth(["student", "admin", "super_admin"]),
  subject_controllers.get_all_subjects
);

export const subject_routes = router;
