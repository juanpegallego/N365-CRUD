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

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 0;
  color: white;
  font-family: "Noto Sans", sans-serif;
`;
export { StyledInput, StyledLabel };
