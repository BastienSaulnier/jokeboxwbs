import { insert, query } from "../utils/db";
import jwt from "jwt-simple";
import bcrypt from "bcrypt";

/**
 * Model comment
 * @param {string}
 */

export const getUserByEmailModel = ({ email }) => {
  return new Promise((resolve, reject) => {
    query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (error) reject(error);
      resolve(result.rows.length !== 0 ? result.rows[0] : null);
    });
  });
};

/**
 * Model comment
 * @param {string}
 */
export const isPasswordVerifiedModel = ({ password, hashedPassword }) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, isVerified) => {
      if (err) reject(err);
      resolve(isVerified ? true : false);
    });
  });
};

/**
 * Model comment
 * @param {string}
 */

export const setTokenModel = ({ user }) => {
  return new Promise((resolve, reject) => {
    const token_content = {
      user_id: user.user_id,
      type: "user",
    };
    const token = jwt.encode(token_content, process.env.JWT_SECRET);
    resolve(token.length !== 0 ? token : null);
  });
};
