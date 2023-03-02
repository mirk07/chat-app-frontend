import React from "react";
import { useState, useRef } from "react";
import "../index.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getCurrentUser() {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
  }
  async function checkUser() {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${getAllUsers}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setavatar");
      }
    }
  }
  useEffect(() => {
    getCurrentUser();
  }, []);
  useEffect(() => {
    checkUser();
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="container">
      <div className="chatContainer">
        <Contacts
          changeChat={handleChatChange}
          contacts={contacts}
          currentUser={currentUser}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            socket={socket}
            currentUser={currentUser}
            currentChat={currentChat}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
