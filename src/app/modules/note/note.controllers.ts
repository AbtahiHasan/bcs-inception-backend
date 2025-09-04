import catch_async from "../../utils/catch-async";
import { send_response } from "../../utils/send-response";
import { note_services } from "./note.services";
import httpStatus from "http-status";

const create_note = catch_async(async (req, res) => {
  const result = await note_services.create_note(req.body);

  send_response(res, {
    success: true,
    status_code: httpStatus.CREATED,
    message: "note created successfully",
    data: result,
  });
});
const get_notes = catch_async(async (req, res) => {
  const result = await note_services.get_notes(req.query);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "note fetch successfully",
    data: result.data,
    meta: result.meta,
  });
});
const delete_note = catch_async(async (req, res) => {
  const result = await note_services.delete_note(req.params.id);

  send_response(res, {
    success: true,
    status_code: httpStatus.OK,
    message: "note delete successfully",
    data: result,
  });
});

export const note_controllers = {
  create_note,
  get_notes,
  delete_note,
};
