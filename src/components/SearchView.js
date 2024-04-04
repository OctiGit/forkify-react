import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store";
import { useState } from "react";
import { ICONS_PATH } from "../config";

function SearchView() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(inputValue));
    setInputValue("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="search">
      <input
        value={inputValue}
        onChange={onChangeHandler}
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href={`${ICONS_PATH}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}

export default SearchView;
