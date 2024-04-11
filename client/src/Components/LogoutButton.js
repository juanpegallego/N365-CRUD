import styled from "styled-components";

const StyledLogoffButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  margin: 5px;
  color: white;
  background: transparent;
  font-size: 15px;
`;
function LogoffButton({ handleLogout }) {
  return <StyledLogoffButton onClick={handleLogout}>Exit</StyledLogoffButton>;
}

export default LogoffButton;
