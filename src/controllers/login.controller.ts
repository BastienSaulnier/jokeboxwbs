import {
  isPasswordVerifiedModel,
  getUserByEmailModel,
  setTokenModel,
} from "../models/login.model";

/**
 * Login controller
 */
export const loginController = async (req, res) => {
  const { email, password } = req.body.values;
  const user: any = await getUserByEmailModel({ email });

  if (user !== null) {
    const hashedPassword = user.password;
    const isPasswordVerified = await isPasswordVerifiedModel({
      password,
      hashedPassword,
    });
    if (isPasswordVerified === true) {
      const token = await setTokenModel({ user });
      if (token !== null) {
        res.json({
          isLogged: true,
          token: token,
          error: null,
          success: true,
        });
      } else {
        res.json({
          isLogged: false,
          token: null,
          error: { api: "Unable to authenticate." },
          success: false,
        });
      }
    } else {
      res.json({
        isLogged: false,
        token: null,
        error: { password: "Incorrect password." },
        success: false,
      });
    }
  } else {
    res.json({
      isLogged: false,
      token: null,
      error: { email: "Unknown email/username." },
      success: false,
    });
  }
};
