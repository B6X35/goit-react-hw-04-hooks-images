import { useState } from "react";
import { initialState } from "./initialState"
import PropTypes from "prop-types";
import style from './SearchForm.module.css'

function SearchForm ({onSubmit}) {
  const [state, setState] = useState(initialState);

  const searchQuery = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const submitQuery = (e) => {
    e.preventDefault();
    onSubmit(state);
    setState({ ...initialState });
  };

    return (
      <header className={style.searchbar}>
        <form onSubmit={submitQuery} className={style['search-form']}>
          <button type="submit" className={style['search-form-button']}>
            <span className={style['search-form-button-label']}>Search</span>
          </button>

          <input
            className={style['search-form-input']}
            type="text"
            autoComplete="off"
            name="query"
            value={state.query}
            onChange={searchQuery}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

export default SearchForm;

SearchForm.propType = {
  onSubmit: PropTypes.func.isRequired
}