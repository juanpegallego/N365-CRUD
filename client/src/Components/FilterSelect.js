import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  margin: 0 5px 0 0;
  cursor: pointer;
  display: flex;
  max-height: 30px;
  background: white;
  border: none;
`;

function FilterSelect({
  filters,
  handleFilterChange,
  filterTypeString,
  filterText,
  filtros,
}) {
  return (
    <StyledSelect
      onChange={(e) => handleFilterChange(filterTypeString, e.target.value)}
      value={filters.filterType}
    >
      <option hidden>{filterText}</option>
      {filtros
        .sort((a, b) => a.localeCompare(b))
        .map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
    </StyledSelect>
  );
}

export default FilterSelect;
