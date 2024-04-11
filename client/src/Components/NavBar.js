import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0px;
  width: 800px;
  background: #757c99;
  margin: auto;
`;

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
  background: #757c99;
  padding: 0 15px;
`;

export default function NavBar({ userIsLogged, userNameLabel }) {
  return (
    <StyledNavBarWrapper>
      <StyledNavBar>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "220px",
          }}
        >
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            List Payments
          </Link>

          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/payments/new"
          >
            New Payment
          </Link>
        </nav>

        <Link
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to="/login"
        >
          {userIsLogged ? userNameLabel : "Account"}
        </Link>
      </StyledNavBar>
    </StyledNavBarWrapper>
  );
}
