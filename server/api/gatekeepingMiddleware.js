const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access Denied");
  } else {
    next();
  }
};

const isEngineer = (req, res, next) => {
  if (!req.user.isEngineer) {
    return res.status(403).send("Access Denied");
  } else {
    next();
  }
};

const isAdminOrEngineer = (req, res, next) => {
  if (!req.user.isEngineer && !req.user.isAdmin) {
    return res.status(403).send("Access Denied");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
  isEngineer,
  isAdminOrEngineer,
};
