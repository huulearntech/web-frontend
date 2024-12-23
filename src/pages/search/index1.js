import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardView from './cards_view';
import MapView from './map_view';
import SearchBar from './SearchBar';
import fake_products from './fake_products'; // Replace with actual data fetching logic

// Map truyen tham so searchSpec va searchList


const SearchPage = () => {
  const [isListView, setIsListView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const totalPages = 20;

  const location = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    console.log('Fetching search results for query:', query, 'page:', currentPage);
    window.setTimeout(() => {
      // Simulate fetching data
      setSearchResults(fake_products); // Replace with actual fetch logic
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout();
    };
  }, [query, currentPage]);

  const toggleView = () => {
    setIsListView(!isListView);
    navigate(`${location.pathname}?view=${isListView ? 'map' : 'list'}`);
  };

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <div className="flex items-center justify-center w-full py-2">
        <SearchBar onSearch={handleSearch} />
        <button onClick={toggleView} className="ml-4">
          {isListView ? 'Switch to Map View' : 'Switch to List View'}
        </button>
      </div>
      {isListView ? (
        <CardView
          searchQuery={query}
          searchResults={searchResults}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <MapView
          searchQuery={query}
          searchResults={searchResults}
          isLoading={isLoading} 
        />
      )}
    </div>
  );
};

export default SearchPage;