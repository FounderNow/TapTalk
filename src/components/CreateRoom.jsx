import { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { MOD } from "../App";
import theme from "../theme";
import { useCallState } from "../CallProvider";

const CreateRoom = () => {
  const { joinRoom, error } = useCallState();

  const firstNameRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      setSubmitting(false);
    }
  }, [error]);

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (submitting) return;
      setSubmitting(true);
      if (!firstNameRef?.current) return;
      let userName = `${firstNameRef?.current?.value}`;
      let name = "";
      /**
       * If they're not submitting a specific room name, we'll create a new
       * room in joinRoom() so let's make them the moderator by default.
       */
      userName = `${userName?.trim()}_${MOD}`;
      joinRoom({ userName, name });
    },
    [firstNameRef, joinRoom, submitting]
  );

  return (
    <Container>
      <Title>Create a Private Audio Room</Title>
      <Form onSubmit={submitForm}>
        <Input
          ref={firstNameRef}
          type="text"
          id="fname"
          name="fname"
          placeholder="First name (or nickname)"
          required
        />
        <Submit>{submitting ? "Creating..." : "Create room"}</Submit>
        {error && <ErrorText>Error: {error.toString()}</ErrorText>}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-top: auto;
  transform: scale(1.20) translateY(10%);

  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
    margin-top: 32px;
  };
  @media (max-width: 900px) {
    transform: scale(1)
  }
`;
const Title = styled.h1`
  font-size: ${theme.fontSize.large};
  color: ${theme.colors.blueDark};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 0 24px;
  width: 100%;
`;

const Input = styled.input`
  border-radius: 8px;
  border: ${theme.colors.grey} 1px solid;
  padding: 4px;
  font-size: 12px;
  line-height: 28px;
  margin-bottom: 4px;

  &:focus {
    outline: ${theme.colors.grey} auto 1px;
  }
`;
const Submit = styled.button`
  margin-top: 16px;
  border: ${theme.colors.cyanLight} 2px solid;
  border-radius: 12px;
  background-color: ${theme.colors.darkCyan};
  padding: 5px;
  font-size: ${theme.fontSize.base};
  font-weight: 600;
  height: 36px;
  color: ${theme.colors.white};
  cursor: pointer;
  &:active {
    background-color: ${theme.colors.cyan};
  }
  &:hover {
    border: ${theme.colors.cyan} solid 2px;
  }
`;
const ErrorText = styled.p`
  margin-left: auto;
  color: ${theme.colors.red};
`;

export default CreateRoom;
