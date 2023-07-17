import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { getSender } from "../config/getSender";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const ChatBox = () => {
  const { selectedChat } = ChatState();
  const [message, setMessage] = useState("");
  const [Messages, setMessages] = useState([]);
  const [loading, setloading] = useState(false);

  const sendMessage = async () => {
    try {
      const userInfoString = localStorage.getItem("userInfo");
      var userInfo = JSON.parse(userInfoString);
      const token = userInfo.token;
      if (!token) {
        console.log("Token not found.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        chatId: selectedChat._id,
        content: message,
      };
      console.log(body);

      const response = await axios.post("/api/message", body, config);
      console.log("Message sent:", response.data);

      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    if (selectedChat.length === 0 || !selectedChat) return;

    try {
      const userInfoString = localStorage.getItem("userInfo");
      var userInfo = JSON.parse(userInfoString);
      const token = userInfo.token;
      if (!token) {
        console.log("Token not found.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setloading(true);
      const { data } = await axios.get(
        `api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setloading(false);
    } catch (error) {}
  };

  const userInfoString = localStorage.getItem("userInfo");
  var userInfo = JSON.parse(userInfoString);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  console.log(selectedChat);

  return (
    <div className="border rounded-lg shadow-lg mx-2 flex flex-col flex-grow bg-white">
      {selectedChat.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl font-semibold mb-4">Welcome to Chat App</h2>
          <p className="text-gray-600 text-lg mb-8">
            Start a conversation by selecting a chat.
          </p>
          <img
            className="w-40 h-40 rounded-full mb-8"
            src="https://img.freepik.com/free-vector/human-hand-holding-mobile-phone-with-text-messages_74855-6531.jpg?size=626&ext=jpg"
            alt="Welcome Image"
          />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold bg-purple-200 p-2 rounded-t-md text-center">
            {getSender(userInfo.loggedIn, selectedChat.users)}
          </h2>
          <div className="flex flex-col h-[70vh] p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
              </div>
            ) : (
              <div className=" flex-grow overflow-y-auto">
                {Messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.sender === userInfo.loggedIn
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`m-2 ${
                        message.sender === userInfo.loggedIn
                          ? "bg-purple-200 rounded-lg p-2"
                          : "bg-blue-200 rounded-lg p-2"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-4 p-2">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-full"
            />

            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white rounded-md px-4 py-2 font-semibold hover:bg-purple-500"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
