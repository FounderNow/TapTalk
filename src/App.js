import styled from "styled-components";
import InCall from "./components/InCall";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import theme from "./theme";
// import { SmallText } from "./components/shared/SmallText";
import { CallProvider, INCALL, PREJOIN, useCallState } from "./CallProvider";
export const MOD = "MOD";
export const SPEAKER = "SPK";
export const LISTENER = "LST";

const AppContent = () => {
  const { view } = useCallState();
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let isRoomId = false;
  let joinRoomId = params.get("roomId");
  if (joinRoomId) {
    isRoomId = true;
  }
  console.log('view and isRoomId', isRoomId, joinRoomId, view);
  return (
    <AppContainer>
      <Wrapper>
        <Header>
          <HeaderTop>
            <Title>
              <LogoTextP1>Tap</LogoTextP1>
              <LogoTextP2>Talk</LogoTextP2>
            </Title>
            {/* <Title>TapTalk</Title> */}
            {view === INCALL && (
              <CreateRoomButton>
                Create a<br />
                New Room
              </CreateRoomButton>
            )}
          </HeaderTop>
          <SubHeading>Your private audio room</SubHeading>
        </Header>
        {view === PREJOIN && !isRoomId && <CreateRoom/>}
        {view === PREJOIN && isRoomId && <JoinRoom roomId={joinRoomId} />}
        {view === INCALL && <InCall />}
      </Wrapper>
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
  max-width: 700px;
  padding: 32px 24px 0;
  min-height: 100%;
  margin: 0 auto;
`;
const Logo = styled.img`
  height: 24px;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
`;
const HeaderTop = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: ${theme.fontSize.xxlarge};
 
  margin: 4px 0;
  font-weight: 600;
`;
const Link = styled.a`
  font-weight: 400;
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.greyDark};
  display: flex;
  justify-content: center;
  max-width: 400px;

  @media only screen and (min-width: 768px) {
    justify-content: ${(props) => (props.center ? "center" : "flex-start")};
    max-width: ${(props) => (props.center ? "100%" : "400px")};
  }
`;
const CreateRoomButton = styled.button`
  font-size: ${theme.fontSize.large};
  color: ${theme.colors.turquoise};
  margin: 4px 0;
  font-weight: 600;
  border: none !important;
  background-color: ${theme.colors.greyLightest};
`;
const LogoTextP1 = styled.span`
  font-family: ${theme.fontFamily.log} !important;
  color: ${theme.colors.darkBlue} !important;
  aspect-ratio: 2.5/1 !important;
  font-weight: 600;
`;
const LogoTextP2 = styled.span`
  font-family: ${theme.fontFamily.log} !important;
  color: ${theme.colors.darkCayn} !important;
  aspect-ratio: 2.5/1 !important;
  font-weight: 600;
`;
const SubHeading = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.sherpaBlue};
  font-family: ${theme.fontFamily.subHeading};
  font-weight: 400;
  margin: ${(props) => props.margin || "12px 0"};
  aspect-ratio: 1/1;
`;


export default App;
