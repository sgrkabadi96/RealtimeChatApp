const Chat = require("../models/Chat");
const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    const user = req.user;
    if (!content || !chatId) {
      res.status(404).json({ msg: "Something went wrong" });
    }

    var newMessage = {
      sender: user.id,
      content: content,
      chat: chatId,
    };

    const results = await Message.create(newMessage);
    const messageId = results.id;
    
    const update = await Chat.findByIdAndUpdate(chatId , {latestMessage : messageId } , {new : true});


    res.status(200).json({ status: "success", data: results });
  } catch (error) {
    res.status(404).json({ msg: "Something went wrong" });
  }
};

const allMessages = async (req, res) => {
  try {

    const chatId = req.params.chatId;
    if (!chatId) {
      res.status(404).json({ msg: "Enter id" });
    }
    const results = await Message.find({chat : chatId});
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ msg: "Something went wrong in accesing " });
  }
};

module.exports = { sendMessage, allMessages };
