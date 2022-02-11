import React, { useRef, useEffect } from "react";
// import styled from "styled-components";
import { useCallState } from "../CallProvider";
import { useMediaQuery } from 'react-responsive'
export const VideoItem = ({ participant }) => {
  const videoRef = useRef(null);
  const { setSharedScreenUserId } = useCallState();
  const pcScreen = useMediaQuery({minWidth:"900px"})
// console.log(pcScreen);

  useEffect(() => {
    if (
      participant?.tracks?.screenVideo &&
      participant?.tracks?.screenVideo?.state === "playable"
    ) {
      videoRef.current.srcObject = new MediaStream([
        participant?.tracks.screenVideo.track,
      ]);
      setSharedScreenUserId(participant?.user_id);
    } else {
      setSharedScreenUserId("");
      return;
    }
    // eslint-disable-next-line
  }, [participant]);

  return (
    <video
      autoPlay
      muted
      playsInline
      id={`video-${participant?.user_id}`}
      ref={videoRef}
      style={{width: "100%", transform: pcScreen?"scale(1.2) translateY(10%)":'scale(1)',marginBottom:'15%'}}
    />
  );
};
/**
 *finding out the participant how shared screen 
 *
 * @param {*} { participants }
 * @return {*} 
 */
const Video = ({ participants }) => {
  let participant;
  
  participant = participants.filter(
    (userList) => userList?.tracks?.screenVideo?.state === "playable"
  );

  return (
    <>
      <VideoItem
        participant={participant?.length ? participant[0] : {}}
        key={`p-${participant?.length ? participant[0]?.user_id : ""}`}
      />
    </>
  );
};

// const Container = styled.div`
//   margin: 48px 0 0;
//   visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
//   height: ${(props) => (props.hidden ? "0" : "300px")};
//   width: ${(props) => (props.hidden ? "0" : "300px")};
// `;
export default Video;
