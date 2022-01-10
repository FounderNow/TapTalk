import styled from "styled-components";
import mic from "../icons/mic.svg";
import simple from "../icons/mic-icon.svg";

const MicIcon = ({ type = "default" }) => {
  const src = type === "default" ? mic : simple;
  return <Icon src={src} />;
};

const Icon = styled.img`
  /* margin-left: 4px; */
`;

export default MicIcon;
