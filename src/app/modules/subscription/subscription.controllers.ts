import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { subscription_services } from "./subscription.services";
import httpStatus from "http-status";

const create_subscription = catch_async(async (req, res) => {
  const result = await subscription_services.create_subscription({
    user_id: req.user.id,
    phone_number: req.body.phone_number,
    payment_method: req.body.payment_method,
    transaction_id: req.body.transaction_id,
  });

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "subscription request sent successfully",
    data: result,
  });
});
const get_my_subscriptions_history = catch_async(async (req, res) => {
  const result = await subscription_services.get_my_subscriptions_history(
    req.user.id,
    req.query as any
  );

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "my subscription history successfully",
    data: result.data,
    meta: result.meta,
  });
});
const get_subscriptions = catch_async(async (req, res) => {
  const result = await subscription_services.get_subscriptions(req.query);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "subscription fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});
const update_status = catch_async(async (req, res) => {
  const result = await subscription_services.update_status(
    req.params.id,
    req.body.status
  );

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "subscription status updated successfully",
    data: result,
  });
});

export const subscription_controllers = {
  create_subscription,
  get_my_subscriptions_history,
  get_subscriptions,
  update_status,
};
