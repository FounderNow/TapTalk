import styled from "styled-components";
import msg from "../icons/chat-icon.svg";
import msgHighlight from "../icons/chat-icon-highlight.svg";

const MsgIcon = ({ highlighted = false }) => {
  console.log('highlightedChat', highlighted)
  const src = highlighted === true ? msgHighlight : msg;
  return <Icon src={src} />;
};

const Icon = styled.img`
   {
    cursor: pointer;
    padding-bottom: 4px;
  }
`;

export default MsgIcon;
