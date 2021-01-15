import jwt from "jwt-simple";

/**
 * Check authentification and return 401 if no autorized for route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const init = (req, res, next) => {
  let found = firewallWhitelist(req.url);

  if (found === false) {
    const bearerHeader = req.headers["authorization"];

    try {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const user = jwt.decode(bearerToken, process.env.JWT_SECRET);
      req.auth = user;
      next();
    } catch (e) {
      res.status(401).send("Unauthorized");
    }
  } else {
    next();
  }
};

/**
 * Manage token JWT and follow this if exist on request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const token = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    res.set("token", bearerToken);
    // try {
    //   const tokenData = jwt.decode(bearerToken, process.env.SECRET_TOKEN || "");

    //   const callback = {
    //     id_user: tokenData.id_user,
    //     type: "application",
    //     expiration: moment().format("X") + 20000,
    //     latitude: tokenData.latitude,
    //     longitude: tokenData.longitude,
    //     name_location: tokenData.name_location,
    //     firstname: tokenData.firstname,
    //   };
    //   const token = jwt.encode(callback, process.env.SECRET_TOKEN || "");

    // res.set("token", token);

    // } catch (e) {
    //   // Error
    // }
    next();
  } else {
    next();
  }
};

/**
 * Check autorisation by account type and route, return 401 if not authorized
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const autorisation = (req, res, next) => {
  let found = firewallWhitelist(req.url);

  if (found === false) {
    const { type } = req.auth;

    firewallAutorisation(req.url, type) === false
      ? res.status(401).send("Unauthorized")
      : next();
  } else {
    next();
  }
};

export const firewallWhitelist = (url) => {
  var f = false;
  const w = [/^\/login/g, /^\/signup/g];

  w.map((r) => {
    if (f === false) {
      f = r.test(url) === true ? true : false;
    }
  });

  return f;
};

export const firewallAutorisation = (url, type) => {
  var f = false;

  const autorisations = {
    user: [/^\/user\/me/g],
  };

  autorisations[type].map((r) => {
    if (f === false) {
      f = r.test(url) === true ? true : false;
    }
  });

  return f;
};
