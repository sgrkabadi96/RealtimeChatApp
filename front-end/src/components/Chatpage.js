import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import SideDrawer from "./SideDrawer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToast } from "@chakra-ui/react";

function Chatpage() {
  const { user } = ChatState();
  const history = useHistory();
  const [fetchAgain, setFetchAgain] = useState(false);
  const userInfoString = localStorage.getItem("userInfo");
  var userInfo = JSON.parse(userInfoString);
  const { selectedChat, setselectedChat ,chat, setchat} = ChatState();
  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />} 
      <div className="border flex justify-between rounded-md  m-3 p-2 h-[88vh] bg-gray-50">
        {user && <MyChats/>}
        {user && <ChatBox></ChatBox>}
      </div>
    </div>
  );
}

export default Chatpage;
