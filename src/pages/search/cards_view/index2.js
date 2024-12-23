import React from 'react';
import { Pagination, Button } from 'antd';
import ProductCard from './ProductCard';
import SearchStatus from './SearchStatus';
import ShowOnMap from './ShowOnMap';
import Filter from './Filter';
import Divider from './Divider';

const CardView = ({ searchQuery, searchResults, isLoading, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-row w-full h-full justify-center">
      <div className="flex flex-col space-y-4 w-full max-w-7xl">
        <div className="flex flex-row w-full space-x-8">
          <div className="w-72 h-full transition-all duration-300">
            <ShowOnMap />
            <Divider />
            <Filter />
          </div>

          <div className="flex flex-col w-full space-y-4">
            <SearchStatus
              query={searchQuery}
              found={searchResults.length}
              onSort={(value) => console.log(value)}
            />

            {searchResults.length === 0 ?
              (
                <div className="flex flex-col items-center justify-center w-full h-96">
                  <p className="text-lg text-gray-500">Không tìm thấy kết quả nào</p>
                  <Button type="primary" className="mt-4">Tìm kiếm lại</Button>
                </div>
              )
              :
              (
                <div className="flex flex-col w-full space-y-4">
                  {searchResults.map((product, index) => (
                    <ProductCard key={index} product={product} isLoading={isLoading} />
                  ))}
                </div>
              )
            }

            <div className="flex justify-center w-full px-4">
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardView;