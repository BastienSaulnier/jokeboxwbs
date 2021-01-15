import {
  isUsernameFreeModel,
  isEmailFreeModel,
  createUserModel,
} from "../models/signup.model";

/**
 * Signup controller
 */
export const signupController = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body.values;
  const isUsernameFree = await isUsernameFreeModel({ username });

  if (isUsernameFree === true) {
    const isEmailFree = await isEmailFreeModel({ email });
    if (isEmailFree === true) {
      const user = await createUserModel({
        firstname,
        lastname,
        username,
        email,
        password,
      });
      if (user !== undefined) {
        res.json({ user, error: null });
      } else {
        res.json({ error: { api: "Error while creating user." } });
      }
    } else {
      res.json({ error: { email: "This email is already taken." } });
    }
  } else {
    res.json({ error: { username: "This username is already taken." } });
  }
};
