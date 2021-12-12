import styled from "styled-components";
import theme from "../../theme";

export const SmallText = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.subText};
  font-weight: 400;
  margin: ${(props) => props.margin || "12px 0"};
`;
