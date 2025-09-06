import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { subject_services } from "./subject.services";
import httpStatus from "http-status";

const create_subject = catch_async(async (req, res) => {
  const result = await subject_services.create_subject(req.body);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: result,
  });
});
const get_all_subjects = catch_async(async (req, res) => {
  const result = await subject_services.get_all_subjects();

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: result,
  });
});

export const subject_controllers = {
  create_subject,
  get_all_subjects,
};
