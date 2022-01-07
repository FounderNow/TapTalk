import styled from "styled-components";
import msg from "../icons/message.svg";

const MsgIcon = ({ type = "default", highlighted= false }) => {

  // const src = type === "default" ? mic : simple;
  return <Icon src={msg} />;
};
 

const Icon = styled.img`{
cursor: pointer;
padding-bottom: 4px;
}
`;

export default MsgIcon;

