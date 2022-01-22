import React, { useState, useEffect, useRef } from "react";
import { useCallState } from "../CallProvider";
import styled from "styled-components";

const Chat = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { chatHistory, sendMessage ,displayName} = useCallState();
  const [onView, setonView] = useState("Chat");
  const messagesRef = useRef(null);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    messagesRef?.current?.scrollIntoView(true);
    console.log("calling", props.participants);
  }, [chatHistory]);
  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue) {
      sendMessage({ message: inputValue });
    }
    setInputValue("");
  }

  return props.onClickDisplay ? (
    <ChatRoom>
      <ChatHistory>
        <ChatHeadingList>
          {/* people working on chat tab */}
          {/* <HeadingItem onClick={() => setonView("Participant")}>
            People {onView === "Participant" && <Hr></Hr>}
          </HeadingItem> */}
          <HeadingItem onClick={() => setonView("Chat")}>
            Chat {onView === "Chat" && <Hr></Hr>}
          </HeadingItem>
          <HeadingItem onClick={() => props.setChatDisplay(false)}>
            X
          </HeadingItem>
        </ChatHeadingList>
        <MainHr></MainHr>
        {onView === "Chat" && (
          <MessagesList>
            {chatHistory.map((entry, index) => (
              <>
                <MessageList key={`entry-${index}`}>
                  {entry?.type === 1 ? (
                    <Message> {entry.message}</Message>
                  ) : (
                    <VisitorMessage> {entry.message}</VisitorMessage>
                  )}
                  <MessageSender>{displayName(entry.sender)}</MessageSender>
                </MessageList>
              </>
            ))}
            <div ref={messagesRef} id="#scollection"></div>
          </MessagesList>
        )}
        {/* {onView === "Participant" && (
          <>
            {props?.participants?.map((item) => (
              <PartcipentsList>
                <Participant key={item.user_id}>{displayName(item.user_name)}</Participant>
              </PartcipentsList>
            ))}
          </>
        )} */}

        {onView === "Chat" && (
          <>
            <form onSubmit={handleSubmit}>
              <ChatInput
                id="chatInput"
                className="chat-input"
                type="text"
                placeholder="Type your message here.."
                value={inputValue}
                onChange={handleChange}
              ></ChatInput>
              <SendChatButton onClick={handleSubmit}>{">>"}</SendChatButton>
            </form>
          </>
        )}
      </ChatHistory>
    </ChatRoom>
  ) : null;
};

const ChatRoom = styled.div`
  position: absolute;
  right: 10px;
  bottom: 75px;
`;
const Participant = styled.p`
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  &:nth-child(2) {
    margin-left: auto;
    padding-right: 10px;
  }
`;
const PartcipentsList = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  height: 30px;
`;
const ChatHeadingList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  margin-left: -30px;
`;
const MessagesList = styled.div`
  position: absolute;
  right: 0px;
  bottom: 50px;
  width: 250px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 4px;
  overflow: scroll;
  @media (max-height: 650px) {
    height: 300px;
  }
`;
const HeadingItem = styled.li`
  padding-right: 10px;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin-left: auto;
  }
`;
const MainHr = styled.hr`
  margin-top: -21px;
`;

const MessageList = styled.div`
  padding: 1px 6px 1px 6px;
  font-weight: 400;
  font-size: 12px;
`;
const MessageSender = styled.p`
  font-size: 8px;
  margin-left: 6px;
  margin-top: -9px;
  color: #757272;
`;
const FooterManu = styled.div`
  position: absolute;
  bottom: 1px;
  font-size: 12px;
  margin-left: 4px;
  margin-right: 4px;
  padding-left: 10px;
  color: #6b7785;
  right: 10px;
`;
const Message = styled.p`
  background-color: #1bebb9;
  padding: 4px;
  border-radius: 10px 10px 10px 10px;
  word-break: break-all;
`;
const VisitorMessage = styled.p`
  background-color: #eff3f5;
  padding: 4px;
  border-radius: 10px 10px 10px 10px;
  word-break: break-all;
`;
const ChatHistory = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 250px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 4px;
  @media (max-height: 650px) {
    height: 400px;
  }
  /* border-style: groove; */
`;
const ChatInput = styled.input`
  position: absolute;
  bottom: 16px;
  width: 220px;
  height: 32px;
  border-radius: 8px;
  margin-left: 4px;
  margin-right: 4px;
  border: 1px solid #c8d1dc;
  padding-left: 10px;
  padding-right: 20px;
  &:focus {
    border: 1px solid #1bebb9;
  }
`;
const Hr = styled.hr`
  background-color: #1bebb9;
  height: 4px;
  color: #1bebb9;
  margin-bottom: 2px;
  border: 2px;
`;
const SendChatButton = styled.button`
  position: absolute;
  bottom: 22px;
  right: 20px;
  width: 24px;
  height: 21px;
  background-color: #ffff;
  border: none;
  font-weight: bold;
  transition: all 0.5s ease;
  &:hover {
    color: #1bebb9;
    cursor: pointer;
  }
`;

export default Chat;
