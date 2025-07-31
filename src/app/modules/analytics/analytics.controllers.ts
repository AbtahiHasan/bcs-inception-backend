import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { analytics_services } from "./analytics.services";
import httpStatus from "http-status";

const get_analytics = catch_async(async (req, res) => {
  const result = await analytics_services.get_analytics();
  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "analytics fetch successfully",
    data: result,
  });
});

export const analytics_controllers = {
  get_analytics,
};
