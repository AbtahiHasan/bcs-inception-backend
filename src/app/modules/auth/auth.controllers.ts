import { fromNodeHeaders } from "better-auth/node";
import httpStatus from "http-status";
import { auth } from "../../lib/auth";
import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";

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

export const auth_controllers = {
  get_me,
};
