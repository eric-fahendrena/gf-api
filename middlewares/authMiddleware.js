import jwt from "jsonwebtoken";

function authToken(req, res, next) {
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "missing token"});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usr) => {
    if (err) {
      return res.status(403).json({ message: "token invalid" });
    }

    req.user = usr;
    next();
  });
}

export default authToken
