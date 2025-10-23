import config from "../../../config";
import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { set_tokens } from "../../utils/set-tokens";
import { auth_services } from "./auth.services";
import httpStatus from "http-status";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../lib/auth";

const register_user = catch_async(async (req, res) => {
  const password = req.body.password;
  const result = await auth_services.register_user(req.body);
  let new_result = null;
  if (!!result) {
    new_result = await auth_services.login_user({
      email: result.email!,
      password: password,
    });
  }

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: {
      user: {
        id: new_result?.user?.id,
        name: new_result?.user?.name,
        phone_number: new_result?.user?.phone_number,
        email: new_result?.user?.email,
        role: new_result?.user?.role,
        subscription_status: new_result?.subscription_status,
      },
      token: new_result?.access_token,
    },
  });
});
const login_user = catch_async(async (req, res) => {
  const { access_token, refresh_token, user, subscription_status } =
    await auth_services.login_user(req.body);

  set_tokens(res, { access_token, refresh_token });

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: {
      user: {
        id: user?.id,
        name: user?.name,
        phone_number: user?.phone_number,
        email: user?.email,
        role: user?.role,
        subscription_status,
      },
      token: access_token,
    },
  });
});
const get_me = catch_async(async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    data: session,
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
