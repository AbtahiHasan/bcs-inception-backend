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
const create_bulk_mcqs = catch_async(async (req, res) => {
  const result = await exam_services.create_bulk_mcqs(req.body);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "mcqs created successfully",
    data: result,
  });
});
const get_exam = catch_async(async (req, res) => {
  const result = await exam_services.get_exam(
    req.params.id,
    req.query?.exam_status! as any
  );

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "exam fetched successfully",
    data: result,
  });
});
const get_exams = catch_async(async (req, res) => {
  const result = await exam_services.get_exams(req.query);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "exams fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});
const delete_exam = catch_async(async (req, res) => {
  const result = await exam_services.delete_exam(req.params.id);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "exam delete successfully",
    data: result,
  });
});
const create_user_exam_ans = catch_async(async (req, res) => {
  const result = await exam_services.create_user_exam_ans(
    req.user.id,
    req.body
  );

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "user exam ans created successfully",
    data: result,
  });
});
const get_user_ans = catch_async(async (req, res) => {
  const result = await exam_services.get_user_ans(req.user.id, req.params.id);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "user exam ans fetched successfully",
    data: result,
  });
});
const get_user_taken_exams = catch_async(async (req, res) => {
  const result = await exam_services.get_user_taken_exams(req.user.id);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "user taken fetched successfully",
    data: result,
  });
});

export const exam_controllers = {
  create_exam,
  create_mcq,
  create_bulk_mcqs,
  get_exam,
  get_exams,
  delete_exam,
  create_user_exam_ans,
  get_user_ans,
  get_user_taken_exams,
};
