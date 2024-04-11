import { React, useState } from "react";
import styled from "styled-components";

const StyledSearchBtn = styled.button`
  margin: 20px 5px 0 0;
  background: white;
  border: none;
  min-width: 100px;
  cursor: pointer;
  border-radius: 0px;
  background: grey;
  color: white;
  padding: 8px 12px;
`;
const StyledSearchInput = styled.input`
  margin: 20px 0 0 0;
  background: white;
  border: none;
  min-width: 300px;
  max-width: 100%;
`;
function SearchInput({ filters, handleFilterChange }) {
  const [searchStatus, setSearchStatus] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <StyledSearchBtn onMouseOver={() => setSearchStatus(!searchStatus)}>
        SEARCH🔍
      </StyledSearchBtn>
      {searchStatus && (
        <StyledSearchInput
          type="text"
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          placeholder="Search by amount, concept or recipient"
        />
      )}
    </div>
  );
}

export default SearchInput;
