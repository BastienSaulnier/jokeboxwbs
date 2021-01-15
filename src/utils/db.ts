import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DEV_DATABASE_USER,
  host: process.env.DEV_DATABASE_HOST,
  database: process.env.DEV_DATABASE_NAME,
  password: process.env.DEV_DATABASE_PASSWORD,
  port: process.env.DEV_DATABASE_PORT,
});

/**
 * Insert query
 * @param {string} request
 * @param {array} values
 * @param {function} callback
 */
export const insert = (request: string, values: any[], callback?: any) => {
  pool.connect(function (err, client, done) {
    client.query(request, values, function (err, result) {
      done();
      callback(result, err);
    });
  });
};

/**
 * Other query's (select, update, delete)
 * @param {string} text
 * @param {array} params
 * @param {function} callback
 */
export const query = (text: string, params, callback?: any) => {
  return pool.query(text, params, callback);
};
