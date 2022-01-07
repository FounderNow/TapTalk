import React, { useRef, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { useCallState } from "../CallProvider";
export const VideoItem = ({ participant }) => {
  const videoRef = useRef(null);
  const { setSharedScreenUserId, sharedScreenUserId } = useCallState();

  useEffect(() => {
    console.log("calling before in conditions===>", participant);
    // if (!participant?.videoTrack || !videoRef.current || participant?.local)
    //   return;
    // sanity check to make sure this is an audio track
    console.log(JSON.parse(JSON.stringify(participant)), "dtaaaaa===>");
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
  }, [participant]);

  return (
    <video
      autoPlay
      muted
      playsInline
      id={`video-${participant?.user_id}`}
      ref={videoRef}
      style={{
        width: "700px",
        height: "600px",
        margin: 0,
      }}
    />
  );
};

export const Video = ({ participants }) => {
  // participant)
  let participant;
  // useEffect(() => {
  participant = participants.filter(
    (userList) => userList?.tracks?.screenVideo?.state === "playable"
  );
  console.log("video", JSON.parse(JSON.stringify(participant)));
  // }, [participant])

  return (
    <>
      {/* {participants.map((p) => ( */}
      <VideoItem
        participant={participant?.length ? participant[0] : {}}
        key={`p-${participant?.length ? participant[0]?.user_id : ""}`}
      />
      {/* ))} */}
    </>
  );
};

const Container = styled.div`
  margin: 48px 0 0;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  height: ${(props) => (props.hidden ? "0" : "300px")};
  width: ${(props) => (props.hidden ? "0" : "300px")};
`;
export default Video;
