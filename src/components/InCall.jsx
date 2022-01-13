import { useMemo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { INCALL, useCallState } from "../CallProvider";
import { SPEAKER, MOD } from "../App";
import CopyLinkBox from "./CopyLinkBox";
import Participant from "./Participant";
import Audio from "./Audio";
import MicIcon from "./MicIcon";
import ShareScreenIcon from "./shareScreenIcon";
import MsgIcon from "./MsgIcon";
import MutedIcon from "./MutedIcon";
import theme from "../theme";
import Chat from "./Chat";
import DailyIframe from "@daily-co/daily-js";
import Video from "./Video";

const InCall = () => {
  const {
    participants,
    room,
    view,
    getAccountType,
    leaveCall,
    handleMute,
    handleUnmute,
    raiseHand,
    lowerHand,
    endCall,
    stopScreenShare,
    highlightSharingScreen,
    startScreenShare,
  } = useCallState();
  let screenSharingParticipant;
  const [displayChat, setChatDisplay] = useState(false);
  const [highlightedChat, setChatHighlight] = useState(false);
  // const [highlightSharingScreen, setShareScreenHighlight] = useState(false);
  const [isSharingScreen, setSharingScreen] = useState(false);
  const local = useMemo(
    (p) => participants?.filter((p) => p?.local)[0],
    [participants]
  );
  const toggleChat = () => {
    setChatDisplay(!displayChat);
    // if (highlightedChat) {
      setChatHighlight(!highlightedChat);
    // }
  };
  const mods = useMemo(
    () =>
      participants?.filter(
        (p) => p?.owner && getAccountType(p?.user_name) === MOD
      ),
    [participants, getAccountType]
  );
  const speakers = useMemo(
    (p) =>
      participants?.filter((p) => getAccountType(p?.user_name) === SPEAKER),
    [participants, getAccountType]
  );
  const handleNewChat = () => {
    setChatHighlight(!highlightedChat);
  };
  const canSpeak = useMemo(() => {
    const s = [...mods, ...speakers];
    return (
      <CanSpeakContainer>
        {s?.map((p, i) => (
          <Participant
            participant={p}
            key={`speaking-${p.user_id}`}
            local={local}
            modCount={mods?.length}
          />
        ))}
      </CanSpeakContainer>
    );
  }, [mods, speakers, local]);
  const toggleSharingScreen = () => {
    isSharingScreen ? stopScreenShare() : startScreenShare();
    isVideoTrue();
    // setSharingScreen(!isSharingScreen);
    // setShareScreenHighlight(!highlightSharingScreen)
  };
  const handleAudioChange = useCallback(
    () => (local?.audio ? handleMute(local) : handleUnmute(local)),
    [handleMute, handleUnmute, local]
  );
  const handleHandRaising = useCallback(
    () =>
      local?.user_name.includes("✋") ? lowerHand(local) : raiseHand(local),
    [lowerHand, raiseHand, local]
  );
  const isVideoTrue = () => {};
  useEffect(() => {
    console.log("isVideoTrue", participants);
    screenSharingParticipant = participants?.filter((item) =>
      item?.tracks?.screenVideo?.state.includes("playable")
    );
    if (screenSharingParticipant && screenSharingParticipant.length > 0) {
      setSharingScreen(true);
    } else {
      setSharingScreen(false);
    }
  }, [participants]);

  return (
    <>
      {console.log(local, "local")}
      <Container hidden={view !== INCALL}>
        <CallHeader>
          <Header></Header>
        </CallHeader>
        {isSharingScreen && (
          <>
            <VideoContainer>
              <Video participants={participants} />
            </VideoContainer>
          </>
        )}
        {canSpeak}
        <CopyLinkBox room={room} />
        <Tray>
          <TrayContent>
            {[MOD, SPEAKER].includes(getAccountType(local?.user_name)) ? (
              <AudioButton onClick={handleAudioChange}>
                {local?.audio ? (
                <MicIcon type="simple" style={true} />
                 ) : ( 
                <MutedIcon type="simple" style={true} /> 
                 )} 
                <ButtonText>{local?.audio ? "Mute" : "Unmute"}</ButtonText>
              </AudioButton>
            ) : (
              <HandButton onClick={handleHandRaising}>
                <ButtonText>
                  {local?.user_name.includes("✋")
                    ? "Lower hand"
                    : "Raise hand ✋"}
                </ButtonText>
              </HandButton>
            )}
            <Chat
              onClickDisplay={displayChat}
              setChatDisplay={setChatDisplay}
              notification={handleNewChat}
              participants={[...mods, ...speakers]}
            />
            <LeaveButton onClick={toggleChat} highlighted={highlightedChat}>
              <MsgIcon highlighted= {highlightedChat} />
              <ButtonText>Chat</ButtonText>
            </LeaveButton>
            {DailyIframe.supportedBrowser().supportsScreenShare && (
              <LeaveButton
                highlighted={isSharingScreen}
                onClick={toggleSharingScreen}
              >
                <ShareScreenIcon highlighted= {highlightSharingScreen}/>
                <ButtonText>Share Screen</ButtonText>
              </LeaveButton>
            )}
            {mods?.length < 2 && getAccountType(local?.user_name) === MOD ? (
              <LeaveButtonV2
                // type="submit"
                onClick={endCall}
                // value="End Call"
              >End Call</LeaveButtonV2>
            ) : (
              <LeaveButtonV2
                // type="submit"
                onClick={leaveCall}
                // value="Leave"
              >Leave</LeaveButtonV2>
            )}
          </TrayContent>
        </Tray>

        <Audio participants={participants} />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 48px 0 0;
  position: relative;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  height: ${(props) => (props.hidden ? "0" : "100%")};
`;
const LeaveCallButton = styled.button`
  /* margin-left: auto;
  align-items: center;
  background-color: red;
  color: white;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer; */
`;
const VideoContainer = styled.div`
  height: 100%;
  /* width: 300px; */
  /* margin-bottom: 0px; */
  /* margin: auto; */
`;
const CanSpeakContainer = styled.div`
  border-bottom: ${theme.colors.grey} 1px solid;
  margin-bottom: 20%;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 900px) {
    transform: scale(1.20) translateY(10%);
  }
`;
const Header = styled.h2`
  font-size: ${theme.fontSize.large};
  color: ${theme.colors.greyDark};
`;
const CallHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;
const Tray = styled.div`
  /* display: flex; */
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100vw;
  box-sizing: border-box;
  background-color: ${theme.colors.greyLight};
  padding-top: 20px;
`;
const TrayContent = styled.div`
  /* max-width: 600px; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap:${ DailyIframe.supportedBrowser().supportsScreenShare?"5% ": "10%"};
  /* gap: 15%; */
  /* justify-content: center; */
  /* margin-left: 20%;
  margin-right: 20%;
  flex-wrap: wrap;
 justify-content: center; */
  /* @media only screen and (min-width: 480px) {
    justify-content: ${(props) => (props.center ? "center" : "flex-start")};
    gap: 2%;
  } */
  /* justify-content: space-between; */
  /* width: 100%; */
`;
const Button = styled.button`
  font-weight: 600;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${theme.colors.greyLightest};
  }
`;
const LeaveButton = styled(Button)`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  align-items: center;
  /* justify-content: start; */
  /* margin-left: auto;
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
  cursor: pointer; */
`;
const LeaveButtonV2 = styled.button`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 400;
  border-radius: 10px 10px 10px 10px;
  background-color: ${theme.colors.red};
  font-family: ${theme.fontFamily.regular};
  border: none;
  @media (max-width: 480px) {
    padding-left: 6px;
    padding-right: 6px;
    font-size: 10px;
    font-weight: 600;
  }
  &:hover {
    cursor: pointer;
  }
  /* margin-left: auto;
  align-items: center;
  margin-top: 8px;
  height: 70%;
  background-color: ${theme.colors.redDark};
  color: ${theme.colors.white} */
`;
const HandButton = styled(Button)`
  /* margin-right: auto; */
`;
const AudioButton = styled(Button)`
  /* margin-right: auto; */
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  /* margin-top: auto; */
  /* &:nth-child(1){
    padding-left: 4px;
  } */
`;
const ButtonText = styled.span`
  /* margin-left: 4px; */
  font-family: ${theme.fontFamily.regular};
  font-weight: 400;
  font-size: ${theme.fontSize.med};
  margin-top: auto;
  /* color : ${theme.colors.turquoise}; */
`;

export default InCall;
