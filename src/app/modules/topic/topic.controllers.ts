import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { topic_services } from "./topic.services";
import httpStatus from "http-status";

const create_topic = catch_async(async (req, res) => {
  const result = await topic_services.create_topic(req.body);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "topic created successfully",
    data: result,
  });
});
const get_all_topics = catch_async(async (req, res) => {
  const result = await topic_services.get_all_topics();

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "topics fetched successfully",
    data: result,
  });
});

export const topic_controllers = {
  create_topic,
  get_all_topics,
};
