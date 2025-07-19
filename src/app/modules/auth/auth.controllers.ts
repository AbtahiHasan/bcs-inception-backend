import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { auth_services } from "./auth.services";
import httpStatus from "http-status";

const register_user = catch_async(async (req, res) => {
  const result = await auth_services.register_user(req.body);
  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: result,
  });
});
const login_user = catch_async(async (req, res) => {});
const get_me = catch_async(async (req, res) => {});

export const auth_controllers = {
  register_user,
  login_user,
};
