import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { exam_services } from "./exam.services";
import httpStatus from "http-status";
const create_exam = catch_async(async (req, res) => {
  const result = await exam_services.create_exam(req.body);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "exam created successfully",
    data: result,
  });
});
const create_mcq = catch_async(async (req, res) => {
  const result = await exam_services.create_mcq(req.body);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "mcq created successfully",
    data: result,
  });
});
const get_exam = catch_async(async (req, res) => {
  const result = await exam_services.get_exam(req.params.id);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "exam fetched successfully",
    data: result,
  });
});

export const exam_controllers = {
  create_exam,
  create_mcq,
  get_exam,
};
