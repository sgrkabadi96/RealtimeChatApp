import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const toast = useToast();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const userInfoString = localStorage.getItem("userInfo");
  var userInfo = JSON.parse(userInfoString);
  const { setselectedChat, chat, setchat } = ChatState();

  const logout = () => {
    localStorage.removeItem("userInfo");
    toast({
      title: "Log-out Success",
      description: "You have Logged out successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    history.push("/login");
  };

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`api/user?search=${search}`, config);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {}
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("api/chat", { userId }, config);
      console.log(data);
      if (!chat.find((c) => c._id === data._id)) setchat([data, ...chat]);
      setselectedChat(data);
      setLoading(false);
      handleDrawerToggle();
    } catch (error) {
      toast({
        title: "Error Fetchin Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  return (
    <div className="flex justify-between p-2 m-2  ">
      {isOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow">
          <div className="flex">
            <h2 className="m-4 font-bold text-purple-600 text-xl">
              Search Users
            </h2>
            <button
              onClick={handleDrawerToggle}
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 my-4 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              CLose
            </button>
          </div>

          <div className="flex">
            {" "}
            <input
              className="m-3 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-[60%] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button onClick={handleSearch} className="my-3">
              Go
            </Button>
          </div>

          <ul className="p-4 items-center  justify-center">
            {loading && (
              <div className=" flex justify-center animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            )}
            {searchResults.length === 0 && <div> No results </div>}
            {searchResults.map((user, index) => (
              <div
                className="bg-white shadow-md rounded-lg p-2 py-3 flex items-center my-4 cursor-pointer hover:cursor-pointer"
                key={user._id}
                onClick={() => accessChat(user._id)}
              >
                <img
                  className="w-12 h-12 rounded-full  p-2"
                  src={user.pic}
                  alt={user.name}
                />
                <div>
                  <h2 className="text-l font-bold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}

      <div className="flex">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          placeholder="Search"
          onClick={handleDrawerToggle}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <h1 className="font-bold text-purple-600 text-2xl">Realtime Chat App</h1>
      <div className="flex ">
        <div className="mx-2 p-2"> Welcome {userInfo.username} </div>
        <button
          onClick={logout}
          className="shadow bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideDrawer;
