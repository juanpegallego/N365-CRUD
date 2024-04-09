import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Definir el componente styled fuera del componente funcional
const StyledNavBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 50px;
  background: #757c99;
`;

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #757c99;
  max-width: 50%;
`;

const StyledButton = styled.button`
  cursor: pointer;
  padding: 5px 15px;
  background: green;
  border-radius: 8px;
  border: none;
  margin: 0 10px;
  color: white;
`;

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <StyledNavBarWrapper>
      <StyledNavBar>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          HOME
        </Link>
        <StyledButton onClick={() => navigate("/payments/new")}>
          Add Payment
        </StyledButton>
      </StyledNavBar>
    </StyledNavBarWrapper>
  );
}
