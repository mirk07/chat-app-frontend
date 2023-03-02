import React, { useEffect } from "react";
import { useState } from "react";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (id, contact) => {
    setCurrentSelected(id);
    changeChat(contact);
  };

  return (
    <>
      <div className="contactsContainer">
        <div className="currentUser">
          <div className="currentUserAvatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentUsername}</h3>
          </div>
        </div>
        {currentUserImage && currentUsername && (
          <div className="contacts">
            {contacts.map((contact, id) => {
              return (
                <div
                  onClick={() => changeCurrentChat(id, contact)}
                  key={id}
                  className={`contact ${
                    id === currentSelected ? "selectedContact" : ""
                  }`}
                >
                  <div className="contactAvatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Contacts;
