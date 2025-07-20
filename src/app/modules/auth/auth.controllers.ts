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
const login_user = catch_async(async (req, res) => {
  const { access_token, refresh_token } = await auth_services.login_user(
    req.body
  );

  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 30 * 60 * 60 * 1000,
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 12 * 24 * 30 * 60 * 60 * 1000,
  });

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: {
      access_token,
      refresh_token,
    },
  });
});
const get_me = catch_async(async (req, res) => {
  const access_token = req.cookies.access_token;
  const user = auth_services.get_me(access_token);
  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: user,
  });
});

export const auth_controllers = {
  register_user,
  login_user,
  get_me,
};
