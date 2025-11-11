import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { notice_services } from "./notice.services";
import httpStatus from "http-status";

const create_notice = catch_async(async (req, res) => {
  const result = await notice_services.create_notice(req.body);

  send_response(res, {
    success: true,
    status_code: httpStatus.CREATED,
    message: "notice created successfully",
    data: result,
  });
});
const get_notices = catch_async(async (req, res) => {
  const result = await notice_services.get_notices(req.query);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "notice fetch successfully",
    data: result.data,
    meta: result.meta,
  });
});
const delete_notice = catch_async(async (req, res) => {
  const result = await notice_services.delete_notice(req.params.id);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "notice delete successfully",
    data: result,
  });
});

export const notice_controllers = {
  create_notice,
  get_notices,
  delete_notice,
};
