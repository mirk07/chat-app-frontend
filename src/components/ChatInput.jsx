import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerVisibility = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="chatInputContainer">
      <div className="chatInputButtons">
        <div className="emoji" onClick={handleEmojiPickerVisibility}>
          😀
          <div className="emoji-picker-react">
            {showEmoji && (
              <EmojiPicker
                theme="dark"
                height={400}
                width={400}
                onEmojiClick={handleEmojiClick}
              />
            )}
          </div>
        </div>

        <form className="inputContainer" onSubmit={(event) => sendChat(event)}>
          <input
            className="chatInput"
            type="text"
            placeholder="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="chatButton" type="submit">
            {">"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
