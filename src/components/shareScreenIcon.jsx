import styled from "styled-components";
import shareScreen from "../icons/shareScreen-icon.svg";
import shareScreenHighlight from "../icons/shareScreen-icon-highlight.svg";

const ShareScreenIcon = ({ highlighted = false }) => {
  console.log('height: ', highlighted)
  const src = highlighted === true ? shareScreenHighlight : shareScreen;
  return <Icon src={src} />;
};

const Icon = styled.img`
  cursor: pointer;
  /* height: 60%;
  width: 40%;
  padding-bottom: 5px; */
`;

export default ShareScreenIcon;
