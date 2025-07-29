import config from "../../../config";
import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { set_tokens } from "../../utils/set-tokens";
import { auth_services } from "./auth.services";
import httpStatus from "http-status";

const register_user = catch_async(async (req, res) => {
  const password = req.body.password;
  const result = await auth_services.register_user(req.body);

  if (!!result) {
    console.log({
      email: result.email!,
      password: password,
    });
    await auth_services.login_user({
      email: result.email!,
      password: password,
    });
  }
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

  set_tokens(res, { access_token, refresh_token });

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
  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: req.user,
  });
});
const refresh_token = catch_async(async (req, res) => {
  const { access_token, refresh_token } = await auth_services.refresh_token(
    req.cookies.refresh_token
  );

  set_tokens(res, { access_token, refresh_token });

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: {
      access_token,
      refresh_token,
    },
  });
});
const change_auth_info = catch_async(async (req, res) => {
  await auth_services.change_auth_info(req.user.id, req.body);
  const { access_token, refresh_token } = await auth_services.refresh_token(
    req.cookies.refresh_token
  );
  set_tokens(res, { access_token, refresh_token });
  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "user info updated successfully",
    data: { access_token, refresh_token },
  });
});

const logout = catch_async(async (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "user logout successfully",
    data: null,
  });
});

export const auth_controllers = {
  register_user,
  login_user,
  get_me,
  refresh_token,
  change_auth_info,
  logout,
};
