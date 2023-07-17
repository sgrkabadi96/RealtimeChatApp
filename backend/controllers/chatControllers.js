const Chat = require("../models/Chat");
const User = require("../models/User");

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User id not provided in request");
    return res.status(400);
  }
  var isChat = Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password -pic")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });
  
  const friend =await User.findById(userId);
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var ChatData = {
      chatName: friend.name,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createChat = await Chat.create(ChatData);
      const FullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      throw new Error("Error occured");
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password -pic")
      .sort({ updatedAt: -1 });
    res.status(200).send(chats);
  } catch (error) {}
};

const createGroupChat = async (req, res) => {
  if (!req.body.name || !req.body.users) {
    res.status(400).send({ msg: "Please fill all fields" });
  }

  if (req.body.users.length < 2) {
    res
      .status(400)
      .send({ msg: "more than 2 users must be there to create a group" });
  }
  req.body.users.push(req.user);

  const groupChat = await Chat.create({
    chatName: req.body.name,
    isGroupChat: true,
    users: req.body.users,
    groupAdmin: req.user.id,
  });

  const data = await Chat.findById(groupChat.id)
    .populate("users", "-password -pic")
    .populate("groupAdmin", "-pic -password");
  res.send(data);
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  );

  res.send(updatedChat);
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const Admin = Chat.findById(chatId).groupAdmin;
  if (Admin !== userId) {
    res.status(404).json({ msg: "Only admin can add" });
    return;
  }
  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  );
  res.send(added);
};

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const Admin = Chat.findById(chatId).groupAdmin;
  if (Admin !== userId) {
    res
      .status(404)
      .json("You should be admin to add or Remove the person from group");
  }
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  );
  res.send(removed);
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
