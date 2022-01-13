import { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import copy from "copy-to-clipboard";

const CopyLinkBox = ({ room }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const currentURL = window.location.href; // returns the absolute URL of a page
  return (
    <Container>
      <InviteContainer>
        <Header>Invite Your Friends</Header>
        <SubHeader>Copy and share room link below. </SubHeader>
        <CopyButton
          onClick={() => {
            if (navigator?.clipboard?.writeText) {
              navigator.clipboard.writeText(
                `${currentURL}?roomId=${room?.name}`
              );
            } else {
              copy(`${currentURL}?roomId=${room?.name}`);
            }
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 5000);
          }}
        >
          <CopyButtonText>
            {linkCopied ? "Copied!" : `Copy join link`}
          </CopyButtonText>
        </CopyButton>
      </InviteContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 900px) {
    transform: scale(1.20) translateY(10%);
  }
`;
const InviteContainer = styled.div`
  border: 1px solid ${theme.colors.grey};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
const Header = styled.h3`
  color: ${theme.colors.blueDark};
  margin: 0;
`;
const SubHeader = styled.p`
  text-align: center;
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.black};
`;
const CopyButton = styled.button`
  border: ${theme.colors.cyanLight} 1px solid;
  background-color: ${theme.colors.darkCyan};
  padding: 8px 12px;
  border-radius: 8px;
  width: 122px;
  cursor: pointer;
  color: ${theme.colors.white}

  &:active {
    background-color: ${theme.colors.cyan};
  }
  &:focus {
    outline: none;
    border: ${theme.colors.cyan} 1px solid;
    border-radius: 8px;
  }
`;
const CopyButtonText = styled.span`
  font-size: ${theme.fontSize.base};
  font-weight: 600;
  text-align: center;
  color: ${theme.colors.white};
`;

export default CopyLinkBox;
