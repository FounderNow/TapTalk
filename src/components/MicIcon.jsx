import styled from "styled-components";
import mic from "../icons/mic.svg";
import simple from "../icons/mic-colored.svg";

const MicIcon = ({ type = "default" }) => {
  const src = type === "default" ? mic : simple;
  return <Icon src={src} />;
};

const Icon = styled.img`
cursor: pointer; 
`;

export default MicIcon;
