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

router.get(
  "/taken",
  auth(["student", "admin", "super-admin"]),
  exam_controllers.get_user_taken_exams
);
router.get("/:id", auth(["admin", "super-admin"]), exam_controllers.get_exam);
router.delete(
  "/:id",
  auth(["admin", "super-admin"]),
  exam_controllers.delete_exam
);
router.post(
  "/ans/create",
  auth(["student", "admin", "super-admin"]),
  validate_request(exam_validators.create_user_exam_ans),
  exam_controllers.create_user_exam_ans
);

router.get(
  "/ans/:id",
  auth(["student", "admin", "super-admin"]),
  exam_controllers.get_user_ans
);

export const exam_routes = router;
