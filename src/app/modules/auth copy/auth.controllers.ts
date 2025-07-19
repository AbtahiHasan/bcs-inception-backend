import catch_async from "../../utils/catch-async";

const register_user = catch_async(async (req, res) => {});
const login_user = catch_async(async (req, res) => {});
const get_me = catch_async(async (req, res) => {});

export const auth_controllers = {
  register_user,
  login_user,
};
