import React, { useState } from "react";

export default function ChatFooter({ socket }) {
  const [message, setMessage] = useState("");

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
    /* set delay of one minute */
    setTimeout(() => {
      socket.emit("typing", "");
    }, 5000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
}
