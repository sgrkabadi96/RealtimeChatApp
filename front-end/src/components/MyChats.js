import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button, useToast } from "@chakra-ui/react";
import Chat from "../components/Chat";
import axios from "axios";
import { getSender } from "../config/getSender";

const userInfoString = localStorage.getItem("userInfo");
var userInfo = JSON.parse(userInfoString);




const MyChats = () => {
  const { selectedChat, setselectedChat, chat, setchat } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setchat(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="border p-2 rounded-lg shadow-lg h-[85.5vh] bg-white">
      <h1 className=" m-2 text-xl ">My Chats</h1>
      {console.log(chat)}
      {chat.map((c) => (
        <Chat key={c._id} chat={c} />
      ))}
    </div>
  );
};

export default MyChats;
