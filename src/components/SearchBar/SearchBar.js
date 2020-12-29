import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import s from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handelQueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('Oops, enter your query !');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={s.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={s.SearchFormButton}>
        <span className={s.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={s.SearchFormInput}
        type="text"
        value={query}
        autoComplete="off"
        autoFocus
        placeholder="Search ..."
        onChange={handelQueryChange}
      />
    </form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
