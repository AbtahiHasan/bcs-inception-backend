import { Router } from "express";
import auth from "../../middlewares/auth";
import { validate_request } from "../../middlewares/validate-request";
import { notice_validators } from "./notice.validators";
import { notice_controllers } from "./notice.controllers";

const router = Router();

router.post(
  "/create",
  auth(["admin", "super_admin"]),
  validate_request(notice_validators.create_notice),
  notice_controllers.create_notice
);

router.get("/", notice_controllers.get_notices);
router.delete(
  "/:id",
  auth(["admin", "super_admin"]),

  notice_controllers.delete_notice
);

export const notice_routes = router;
