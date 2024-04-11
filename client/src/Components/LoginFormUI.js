import React from "react";
import styled from "styled-components";
import { StyledInput, StyledLabel } from "./utils/customStyled";
import LogoutButton from "./LogoutButton";

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
`;

const StyledLoginBtn = styled.button`
  display: flex;
  width: auto;

  color: white;
  margin: 5px 0;
  background: green;
  border: none;
  padding: 8px 12px;
  font-family: "Noto Sans", sans-serif;
`;

function LoginFormUI({
  handleSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  handleLogout,
}) {
  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <div>
        <StyledLabel htmlFor="username">Username</StyledLabel>
        <StyledInput
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <StyledLoginBtn type="submit">Login</StyledLoginBtn>
        <LogoutButton handleLogout={handleLogout} />
      </div>
    </StyledLoginForm>
  );
}

export default LoginFormUI;
