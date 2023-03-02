import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import "../index.css";

const SetAvatar = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  async function fetchAvatars() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAvatars();
  }, []);

  const navigate = useNavigate();
  const api = "https://api.multiavatar.com";
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      console.log(avatars[selectedAvatar]);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar image. Please try again!");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container">
          <div style={{ color: "white" }}>
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, id) => {
              return (
                <div
                  key={id}
                  className={`avatar ${
                    selectedAvatar === id ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(id)}
                    width={100}
                    height={100}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="registerButton"
            style={{ marginTop: "15px" }}
            onClick={() => setProfilePicture()}
          >
            Set as profile picture
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default SetAvatar;
