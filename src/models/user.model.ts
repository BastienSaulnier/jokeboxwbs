import { insert, query } from "../utils/db";

/**
 * Model comment
 * @param {string}
 */

export const getUserByIdModel = ({ user_id }) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT firstname, lastname, username, email, avatar_url, avatar_url_thumbnail, is_verified FROM users WHERE user_id='${user_id}'`,
      (error, result) => {
        if (error) reject(error);
        resolve(result.rows[0].length === 0 ? null : result.rows[0]);
      }
    );
  });
};
