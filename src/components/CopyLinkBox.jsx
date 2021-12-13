import { useState } from "react";
import styled from "styled-components";
import theme from "../theme";

const CopyLinkBox = ({ room }) => {
  const [linkCopied, setLinkCopied] = useState(false);
  
  const currentURL = window.location.href // returns the absolute URL of a page

  // const pathname = window.location.pathname
  // console.log('history', pathname);
  // console.log('currentURL,',currentURL)
  return (
    <Container>
      <InviteContainer>
        <Header>Invite Your Friends</Header>
        <SubHeader>
          Copy and share room link below.{" "}
          {/* <Bold>{currentURL}{room?.name}</Bold> */}
        </SubHeader>
        <CopyButton
          onClick={() => {
            navigator.clipboard.writeText(`${currentURL}?roomId=${room?.name}`);
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
  margin-bottom: 24px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
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
const Bold = styled.span`
  font-weight: 600;
`;
const CopyButton = styled.button`
  border: ${theme.colors.cyanLight} 1px solid;
  background-color: ${theme.colors.darkCyan};
  padding: 8px 12px;
  border-radius: 8px;
  width: 122px;
  cursor: pointer;

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
`;

export default CopyLinkBox;
