const mongoose = require("mongoose");
const User = require("../models/User");

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  const userIdToRemove = req.user.id; // Replace with the actual ID of the user you want to remove
  const filteredUsers = users.filter(
    (user) => user._id.toString() !== userIdToRemove
  );

  res.send(filteredUsers);
};

module.exports = { allUsers };
