import styled from "styled-components";
import msg from "../icons/msg.svg";

const MsgIcon = ({ type = "default", highlighted= false }) => {

  // const src = type === "default" ? mic : simple;
  return <Icon src={msg} />;
};
 

const Icon = styled.img`{
cursor: pointer;
}
`;

export default MsgIcon;

