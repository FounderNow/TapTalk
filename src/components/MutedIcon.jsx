import styled from "styled-components";
import muted from "../icons/muted.svg";
import simple from "../icons/muted-icon.svg";

const MutedIcon = ({ type = "default" }) => {
  const src = type === "default" ? muted : simple;
  return <Icon src={src} />;
};

const Icon = styled.img`
  cursor: pointer;
`;

export default MutedIcon;
