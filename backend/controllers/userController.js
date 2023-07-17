const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../config/generateToken");
const hashPassword = require("../config/hashPassword");
const bcrypt = require("bcryptjs");

const authUser = async (req, res) => {
  let token;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not exist" });
 
  bcrypt.compare(password, user.password, (err, data) => {
    if (err) throw err;
    if (data) {
      token = generateToken(user._id);
      return res.status(200).json({token:token ,username : user.name , loggedIn : user._id});
    } else {
      return res.status(401).json({ msg: "Invalid credencial" });
    }
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter all credentails");
  }

  const exits = await User.findOne({ email });
  if (exits) {
    res.status(400).json({"msg": "user Already exist"});
    return
  }
  const hashedPass = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashedPass,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Already exist")
    // throw new Error("Failed to crate user");
    
  }
};

module.exports = {
  authUser,
  registerUser,
};
