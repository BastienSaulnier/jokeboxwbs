import { getUserByIdModel } from "../models/user.model";

/**
 * Login controller
 */
export const getUserByIdController = async (req, res) => {
  const { user_id } = req.auth;
  const user = await getUserByIdModel({ user_id });

  res.send(user);
};
