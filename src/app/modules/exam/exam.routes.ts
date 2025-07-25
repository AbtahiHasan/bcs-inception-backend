import { Router } from "express";
import { exam_controllers } from "./exam.controllers";
import auth from "../../middlewares/auth";
import { validate_request } from "../../middlewares/validate-request";
import { exam_validators } from "./exam.validators";

const router = Router();

router.post(
  "/create",
  auth(["admin", "super-admin"]),
  validate_request(exam_validators.create_exam),
  exam_controllers.create_exam
);
router.post(
  "/mcq/create",
  auth(["admin", "super-admin"]),
  validate_request(exam_validators.create_mcq),
  exam_controllers.create_mcq
);
router.post(
  "/mcq/bulk-create",
  auth(["admin", "super-admin"]),
  validate_request(exam_validators.create_bulk_mcqs),
  exam_controllers.create_bulk_mcqs
);
router.get(
  "/",
  auth(["student", "admin", "super-admin"]),
  exam_controllers.get_exams
);
router.get("/:id", auth(["admin", "super-admin"]), exam_controllers.get_exam);
router.delete(
  "/:id",
  auth(["admin", "super-admin"]),
  exam_controllers.delete_exam
);

export const exam_routes = router;
