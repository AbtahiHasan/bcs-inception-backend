import { Router } from "express";
import { validate_request } from "../../middlewares/validate-request";
import { contact_validators } from "./contact.validators";
import { contact_controllers } from "./contact.controllers";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create",
  validate_request(contact_validators.create_contact),
  contact_controllers.create_contact
);
router.get(
  "/",
  auth(["admin", "super_admin"]),
  contact_controllers.get_contacts
);

export const contact_routes = router;
