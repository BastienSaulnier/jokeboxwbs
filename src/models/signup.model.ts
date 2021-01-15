import { insert, query } from "../utils/db";
import bcrypt from "bcrypt";

/**
 * Model comment
 * @param {string}
 */
export const isUsernameFreeModel = ({ username }) => {
  return new Promise((resolve, reject) => {
    query(
      `SELECT * FROM users WHERE username='${username}'`,
      (error, result) => {
        if (error) reject(error);
        resolve(result.rows.length === 0 ? true : false);
      }
    );
  });
};

/**
 * Model comment
 * @param {string}
 */
export const isEmailFreeModel = ({ email }) => {
  return new Promise((resolve, reject) => {
    query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (error) reject(error);
      resolve(result.rows.length === 0 ? true : false);
    });
  });
};

/**
 * Model comment
 * @param {string}
 */
export const createUserModel = async ({
  firstname,
  lastname,
  username,
  email,
  password,
}) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) reject(err);
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        insert(
          `
            INSERT INTO users(firstname, lastname, username, email, password ) 
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
            `,
          [firstname, lastname, username, email, hash],
          (insert, error) => {
            if (error) reject(error);
            resolve(insert.rows[0]);
          }
        );
      });
    });
  });
};
