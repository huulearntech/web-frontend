import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, Button, Divider, Spin } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

import SearchBar from "../../components/search_bar";
import Filter from "../../components/Filter";

import searchServices from "../../services/searchServices";

// useLocation to get the current URL parameters

const SearchPage = () => {
  const reactLocation = useLocation();


  useEffect(() => {
    // Get the URL parameters and validate them

  }, []);


  return (
    <div className="flex flex-row w-full h-full justify-center">
      <SearchBar />
    </div>
    )
};

export default SearchPage;