import styled from "styled-components";
import InCall from "./components/InCall";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import theme from "./theme";
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
  let joinRoomId = params.get("roomId");
  if (joinRoomId && view !== INCALL) {
    setView(PREJOIN);
  }
  return (
    <AppContainer>
      <Wrapper>
        <Header>
          <HeaderTop>
            <Logo src="/TapTalk_Logo-removebg-preview.png" alt="" />
            {view === INCALL && (
              <CreateRoomButton onClick={createRoomCall}>
                <CreateRoomButtonText>Create a New Room</CreateRoomButtonText>
              </CreateRoomButton>
            )}
          </HeaderTop>
        </Header>
        {view === CREATEROOM && <CreateRoom />}
        {view === PREJOIN && <JoinRoom roomId={joinRoomId} />}
        {view === INCALL && <InCall />}
      </Wrapper>
      <Footer>
        {/* <Link>About Us</Link> */}
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
  }
`;
const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CreateRoomButton = styled.button`
  margin: 8px 0;
  background-color: ${theme.colors.greyLightest};
  border: 2px solid ${theme.colors.deepSkyBlue};
  font-family: ${theme.fontFamily.regular};
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

export default App;
