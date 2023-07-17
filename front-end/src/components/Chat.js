import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../config/getSender";

const Chat = ({ chat }) => {
  const { selectedChat, setselectedChat } = ChatState();

  const selectChat = () => {
    setselectedChat(chat);
  };

  const userInfoString = localStorage.getItem("userInfo");
  var userInfo = JSON.parse(userInfoString);

  const isSelectedChat = chat === selectedChat;

  return (
    <div
      onClick={selectChat}
      className={`${
        isSelectedChat ? "bg-gray-200 border border-gray-700" : "bg-white"
      } shadow-md rounded-md p-2 w-52 py-3 flex items-center my-4 cursor-pointer hover:cursor-pointer`}
    >
      <img className="w-12 h-12 rounded-full p-2" src={chat.users[0].pic} />
      <div>
        <h2 className="text-l font-bold">
          {getSender(userInfo.loggedIn, chat.users)}
        </h2>

        <div className="flex text-sm text-gray-500">
          {" "}
          {chat.latestMessage?.sender === selectedChat._id ? (
            <div> {}</div>
          ) : (
            <div> You : </div>
          )}
          <div>{chat.latestMessage?.content} </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
