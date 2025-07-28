import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { contact_services } from "./contact.services";
import httpStatus from "http-status";

const create_contact = catch_async(async (req, res) => {
  const result = await contact_services.create_contact(req.body);
  send_response(res, {
    success: true,
    status_code: httpStatus.CREATED,
    data: result,
  });
});

const get_contacts = catch_async(async (req, res) => {
  const result = await contact_services.get_contacts(req.query);
  send_response(res, {
    success: true,
    status_code: httpStatus.CREATED,
    data: result.data,
    meta: result.meta,
  });
});

export const contact_controllers = {
  create_contact,
  get_contacts,
};
