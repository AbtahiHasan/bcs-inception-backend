import httpStatus from "http-status";
import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { user_services } from "./user.services";

const get_users = catch_async(async (req, res) => {
  const result = await user_services.get_users(req.query, req.user.id);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "users fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});
const update_user_role = catch_async(async (req, res) => {
  const result = await user_services.update_user_role(req.body);
  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "user role updated successfully",
    data: result,
  });
});

export const user_controllers = {
  get_users,
  update_user_role,
};
