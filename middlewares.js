import jwt from "jsonwebtoken";

//Check Login Status
export const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(403).send(error);
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

//Check Admin
export const isAdmin = (req, res, next) => {
  try {
    if (req.user) {
      const { role } = req.user;

      if (role !== "admin") {
        return res.send(403).json("Admin only");
      }

      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};
