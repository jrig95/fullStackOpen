import React from "react";

const Filter = ({ searchFilter, handleSearchChange }) => {
  return (
    <div>
      Filter the name:{" "}
      <input
        placeholder="search a name"
        value={searchFilter}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Filter;
