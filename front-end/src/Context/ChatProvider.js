import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [selectedChat, setselectedChat] = useState([]);
  const [chat, setchat] = useState([])
  const history = useHistory();
  

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setselectedChat ,chat, setchat}}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
