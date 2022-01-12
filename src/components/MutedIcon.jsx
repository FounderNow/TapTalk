import styled from "styled-components";
import muted from "../icons/muted.svg";
import simple from "../icons/muted-icon.svg";

const MutedIcon = ({ type = "default" }) => {
  const src = type === "default" ? muted : simple;
  return <Icon src={src} />;
};

const Icon = styled.img`
  cursor: pointer;
  /* margin-bottom: 6px; */
  /* margin-left: 14px; */
  /* margin-left: 4px; */
`;

export default MutedIcon;
