import React from "react";

const Welcome = ({ currentUser }) => {
  return (
    <div className="welcomePage">
      <p> Welcome to the club, buddy {currentUser.username}!</p>
    </div>
  );
};

export default Welcome;
