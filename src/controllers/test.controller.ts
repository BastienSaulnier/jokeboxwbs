/**
 * Test comment
 */
export const testRoute = (req, res) => {
  const origin = req.headers.origin;
  const host = req.headers.host;
  res.send(`requete venant de ${origin} et répondue par ${host}`);
};

/**
 * Test comment2
 * @param {}
 */
/* export const testSecondRoute = async (req, res) => {
  res.send("Hello second Wolrd !");
};
 */
