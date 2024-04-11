import styled from "styled-components";

const StyledInput = styled.input`
  display: flex;
  width: auto;
  max-width: 400px;
  padding: 5px 12px;
  color: ${({ color }) => color};
  margin: 5px 0;
  border: none;
  font-family: "Noto Sans", sans-serif;
`;

const StyledButton = styled.button`
  display: flex;
  width: auto;
  color: white;
  padding: 5px 12px;
  background-color: ${({ bgc }) => bgc};
  margin: 10px 0;
  border: none;
  font-family: "Noto Sans", sans-serif;
  cursor: pointer;

  &:hover {
    background: grey;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 0;
  color: white;
  font-size: 12px;
  font-family: "Noto Sans", sans-serif;
`;
export { StyledInput, StyledLabel, StyledButton };
