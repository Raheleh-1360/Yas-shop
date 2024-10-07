import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="bg-gray-100 rounded border border-teal-200 flex items-center justify-between">
        <input
          type="text"
          className="bg-transparent py-1 bg-teal-100 px-4 focus:outline-none w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
        />
        <button
          type="submit"
          className="py-2 px-4 bg-white bg-teal-900 rounded-r border-l border-teal-200 hover:bg-gray-50 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none"
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" /> {/* Add search icon */}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
