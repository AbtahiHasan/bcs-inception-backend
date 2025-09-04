import { Router } from "express";
import auth from "../../middlewares/auth";
import { validate_request } from "../../middlewares/validate-request";
import { note_validators } from "./note.validators";
import { note_controllers } from "./note.controllers";

const router = Router();

router.post(
  "/create",
  auth(["admin", "super_admin"]),
  validate_request(note_validators.create_note),
  note_controllers.create_note
);

router.get(
  "/",
  auth(["admin", "super_admin", "student"]),

  note_controllers.get_notes
);
router.delete(
  "/:id",
  auth(["admin", "super_admin"]),

  note_controllers.delete_note
);

export const note_routes = router;
