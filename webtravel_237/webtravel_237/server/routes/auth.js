const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// registration
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      userRole: req.body.userRole,
      userStatus: req.body.userStatus,
    });

    const user = await newUser.save(); //mongo method to save user to db
    res.status(200).json(user);
    // console.log(user);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //querrying unique user from db
    if (!user) {
      res.status(400).json("Wrong credentials");
      return; //return to prevent sending another response, resulting in headers error
    }
    // !user && res.status(400).json("Wrong credentials");

    const validatePassword = await bcrypt.compare(
      //comparing entered and hashed pass
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("Wrong credentials");
    if (!validatePassword) {
      res.status(400).json("Wrong credentials");
      return;
    }

    const { password, ...others } = user._doc; //excluding password from user when printing it
    res.status(200).json(others);
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
