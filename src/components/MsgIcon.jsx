import styled from "styled-components";
import msg from "../icons/chat-final.svg";
// import msgHighlight from "../icons/chat-icon-highlight.svg";

const MsgIcon = ({ highlighted = false }) => {
  // console.log('highlightedChat', highlighted)
  const src = highlighted === true ? msg : msg;
  return <Icon src={src} />;
};

const Icon = styled.img`
    cursor: pointer;
    padding-bottom: 4px;
`;

export default MsgIcon;
