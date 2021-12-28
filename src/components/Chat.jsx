import React, { useState, useEffect } from "react";
// import CallObjectContext from "../../CallObjectContext";
import { useCallState } from "../CallProvider";
// import "./Chat.css";
import styled from "styled-components";

const Chat = (props) => {
  // const callObject = useContext(CallObjectContext);
  const [inputValue, setInputValue] = useState("");
  // const [chatHistory, setChatHistory] = useState([]);
  const { chatHistory, sendMessage } = useCallState();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Messages State", chatHistory);
    sendMessage({ message: inputValue });
    // callObject.sendAppMessage({ message: inputValue }, "*");
    // const name = callObject.participants().local.user_name
    //   ? callObject.participants().local.user_name
    //   : "Guest";
    // setChatHistory([
    //   ...chatHistory,
    //   {
    //     sender: name,
    //     message: inputValue,
    //   },
    // ]);
    setInputValue("");
  }

  /**
   * Update chat state based on a message received to all participants.
   *
   */
  // useEffect(() => {
  //   if (!callObject) {
  //     return;
  //   }

  //   function (event) {
  //     const participants = callObject.participants();
  //     const name = participants[event.fromId].user_name
  //       ? participants[event.fromId].user_name
  //       : "Guest";
  //     setChatHistory([
  //       ...chatHistory,
  //       {
  //         sender: name,
  //         message: event.data.message,
  //       },
  //     ]);
  //     // Make other icons light up
  //     props.notification();
  //   }

  //   callObject.on("app-message", handleAppMessage);

  //   return function cleanup() {
  //     callObject.off("app-message", handleAppMessage);
  //   };
  // }, [callObject, chatHistory]);

  // useEffect(() => {}, [chatHistory]);

  return props.onClickDisplay ? (
    <ChatRoom>
      <ChatHistory>
        {chatHistory.map((entry, index) => (
          <MessageList key={`entry-${index}`}>
            <b>{entry.sender}</b>: {entry.message}
          </MessageList>
        ))}
      </ChatHistory>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="chatInput"></label> */}
        <ChatInput
          id="chatInput"
          className="chat-input"
          type="text"
          placeholder="Type your message here.."
          value={inputValue}
          onChange={handleChange}
        ></ChatInput>
        <SendChatButton type="submit" className="send-chat-button">
          Send
        </SendChatButton>
      </form>
    </ChatRoom>
  ) : null;
};

const ChatRoom = styled.div`
  position: absolute;
  right: 10px;
  bottom: 75px;
  width: 250px;
  height: calc(100% - 150px);
  background-color: #f2f2f2;
  border-radius: 4px;
`;
const MessageList = styled.div`
  padding-bottom: 10px;
`;
const ChatHistory = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 172px;
  height: 600px;
  background: #ffffff;
  border-radius: 4px;
  padding: 40px;
`;
const ChatInput = styled.input`
  position: absolute;
  bottom: 0px;
  width: 200px;
  height: 25px;
`;

const SendChatButton = styled.button`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 50px;
  height: 31px;
  background-color: #f2f2f2;
  font-weight: bold;
`;

export default Chat;
