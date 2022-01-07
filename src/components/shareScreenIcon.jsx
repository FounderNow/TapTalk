import styled from "styled-components";
import shareScreen from "../icons/shareScreen.svg";

const ShareScreenIcon = ({ type = "default", highlighted = false }) => {
  // const src = type === "default" ? mic : simple;
  return <Icon src={shareScreen} />;
};

const Icon = styled.img`
  cursor: pointer;
  height: 60%;
  width: 40%;
  padding-left: 20px;
  padding-bottom: 3px;
  margin-top: -2px;
`;

export default ShareScreenIcon;
