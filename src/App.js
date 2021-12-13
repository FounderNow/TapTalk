import styled from "styled-components";
import InCall from "./components/InCall";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import theme from "./theme";
import { useState } from "react";
import {
  CallProvider,
  CREATEROOM,
  INCALL,
  PREJOIN,
  useCallState,
} from "./CallProvider";
export const MOD = "MOD";
export const SPEAKER = "SPK";
export const LISTENER = "LST";

const AppContent = () => {
  const { view, setView, createRoomCall } = useCallState();
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let isRoomId = false;
  let joinRoomId = params.get("roomId");
  if (joinRoomId && view !== INCALL) {
    setView(PREJOIN);
  }
  console.log("view and isRoomId", isRoomId, joinRoomId, view);
  return (
    <AppContainer>
      <Wrapper>
        <Header>
          <HeaderTop>
            <Logo src="/TapTalk_Logo-removebg-preview.png" alt="" />
            {/* {view === INCALL && ( */}
              <CreateRoomButton onClick={createRoomCall}>
              <CreateRoomButtonText>Create a New Room</CreateRoomButtonText>  
              </CreateRoomButton>
            {/* )} */}
          </HeaderTop>
          {/* <SubHeading>Your private audio room</SubHeading> */}
        </Header>
        {view === CREATEROOM && <CreateRoom />}
        {/* {isCreateRoom && <CreateRoom/>} */}
        {view === PREJOIN && <JoinRoom roomId={joinRoomId} />}
        {view === INCALL && <InCall />}
      </Wrapper>
      <Footer>
        <Link>About Us</Link>
        <CopyRight>Copyright © 2021 TapTalk</CopyRight>
      </Footer>
    </AppContainer>
  );
};

function App() {
  return (
    <CallProvider>
      <AppContent />
    </CallProvider>
  );
}

const AppContainer = styled.div`
  background-color: ${theme.colors.greyLightest};
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 52px;
  box-sizing: border-box;
`;
const Wrapper = styled.div`
  max-width: 600px;
  padding: 32px 24px 0;
  min-height: 90%;
  margin: 0 auto;
`;
const CopyRight = styled.span`
  font-weight: 400;
  font-size: ${theme.fontSize.base};
  display: flex;
  max-width: 400px;
  font-weight: 400;
`;
const Logo = styled.img`
  height: 88px;
  margin-bottom: 2%;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
`;
const HeaderTop = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 480px) {
    justify-content: ${(props) => (props.center ? "center" : "flex-start")};
    flex-direction: column;
    /* max-width: ${(props) => (props.center ? "100%" : "400px")}; */
  }
  
`;
const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-size: ${theme.fontSize.xxlarge};
  margin: 4px 0;
  font-weight: 600;
`;
const Link = styled.a`
  font-weight: 400;
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.darkCyan};
  display: flex;
  max-width: 400px;
  font-weight: 600;
  /* margin-bottom: 1px; */

  @media only screen and (min-width: 768px) {
    justify-content: ${(props) => (props.center ? "center" : "flex-start")};
    max-width: ${(props) => (props.center ? "100%" : "400px")};
  }
`;
const CreateRoomButton = styled.button`
  margin: 8px 0;
  background-color: ${theme.colors.greyLightest};
  border: 2px solid ${theme.colors.deepSkyBlue};
  border-radius: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
`;
const CreateRoomButtonText = styled.span`
color: ${theme.colors.deepSkyBlue};
font-weight: 600;
font-size: ${theme.fontSize.med};
font-family: ${theme.fontFamily.subText};
margin-left: 4px;
`;
const LogoText = styled.span`
  font-family: ${theme.fontFamily.log} !important;
  color: ${theme.colors.darkCyan} !important;
  aspect-ratio: 2.5/1 !important;
  font-weight: 800;
  font-size: 44.2;
`;
const SubHeading = styled.p`
  color: ${theme.colors.cyanShade};
  font-family: ${theme.fontFamily.subText};
  /* font-weight: 400; */
  font-size: 14.9;
  margin: ${(props) => props.margin || "12px 0"};
`;

export default App;
