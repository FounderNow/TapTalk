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
  const { participants, room, view, getAccountType, leaveCall, handleMute, handleUnmute, raiseHand, lowerHand, endCall, stopScreenShare, highlightSharingScreen, startScreenShare, } = useCallState();
  let screenSharingParticipant;
  const [displayChat, setChatDisplay] = useState(false);
  const [highlightedChat, setChatHighlight] = useState(false);
  const [isSharingScreen, setSharingScreen] = useState(false);
  const local = useMemo(
    (p) => participants?.filter((p) => p?.local)[0],
    [participants]
  );
  const toggleChat = () => {
    setChatDisplay(!displayChat);
      setChatHighlight(!highlightedChat);
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
    // console.log("isVideoTrue", participants);
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
      {/* {console.log(local, "local")} */}
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
                onClick={endCall}
              >End Call</LeaveButtonV2>
            ) : (
              <LeaveButtonV2
                onClick={leaveCall}
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
const VideoContainer = styled.div`
  height: 100%;
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
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100vw;
  box-sizing: border-box;
  align-items: center;
  background-color: ${theme.colors.greyLight};
  padding: 10px;
`;
const TrayContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  column-gap:${ DailyIframe.supportedBrowser().supportsScreenShare ? "5% " : "14%"};

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
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`;
const LeaveButtonV2 = styled.button`
  display: flex;
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
    padding-left: 14px;
    padding-right: 14px;
    font-size: 10px;
    font-weight: 600;
  }
  &:hover {
    cursor: pointer;
  }
`;
const HandButton = styled(Button)`
`;
const AudioButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 70px;
`;
const ButtonText = styled.span`
  font-family: ${theme.fontFamily.regular};
  font-weight: 400;
  font-size: ${theme.fontSize.med};
  margin-top: auto;
`;

export default InCall;
