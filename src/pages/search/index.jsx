import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, Button } from "antd";
import { LeftOutlined } from '@ant-design/icons';

import SearchBar from "../../components/search_bar";
import Filter from "../../components/Filter";

import searchServices from "../../services/searchServices";

// useLocation to get the current URL parameters
const SearchResults = ({ query, page }) => {
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = useCallback(async (query, page) => {
    setLoading(true);
    try {
      const response = await searchServices.search(query, page);
      setResults(response.data.results);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query, page);
    }
  }, [query, page, fetchSearchResults]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
                <p>Published on: {dayjs(result.publishedAt).format('YYYY-MM-DD')}</p>
              </li>
            ))}
          </ul>
          <Pagination
            current={page ? parseInt(page, 10) : 1}
            total={total}
            pageSize={10}
            onChange={(page) => fetchSearchResults(query, page)}
          />
        </>
      )}
    </div>
  );
};

const SearchPage = () => {
  const url = useLocation();

  useEffect(() => {
    // Get the URL parameters and validate them
    const params = new URLSearchParams(url.search);
    const query = params.get("query");
    const page = params.get("page") || 1;

    if (!query) {
      // Handle missing query parameter
      return;
    }

    if (page && isNaN(page)) {
      // Handle invalid page parameter
      return;
    }

    // Fetch search results
    fetchSearchResults(query, page);
  }, []);


  return (
    <div className="flex flex-row w-full h-full justify-center">
      <SearchBar />
      <SearchResults query={new URLSearchParams(url.search).get("query")} 
                     page={new URLSearchParams(url.search).get("page")} />
      <Filter />
      <Button type="primary" icon={<LeftOutlined />} onClick={() => window.history.back()}>
        Back
      </Button>
    </div>
    )
};

export default SearchPage;