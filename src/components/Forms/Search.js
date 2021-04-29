import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchIcon from "../../images/search.svg";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/catalogue?${text}`);
  };

  return (
    <form className="header-search" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        value={text}
        placeholder="Search..."
        className="header-nav__search-input"
      />
      <div onClick={handleSubmit} style={{ cursor: "pointer" }}>
        <img src={SearchIcon} alt="search" />
      </div>
    </form>
  );
};

export default Search;
