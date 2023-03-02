import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button className="registerButton" onClick={() => handleClick()}>
      Logout
    </button>
  );
};

export default Logout;
