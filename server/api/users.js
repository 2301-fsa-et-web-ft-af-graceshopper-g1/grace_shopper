const router = require("express").Router();
const {
  models: { User },
} = require("../db");

const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.userId);
    res.send(singleUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    await user.update(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const user = User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
