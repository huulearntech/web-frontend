

const SearchResults = ({ data, isLoading, isListView, setIsListView, setCurrentPage, setSortBy }) => {
  const { searchResults, location, totalResults, currentPage } = data;
  return (
    <div className="flex flex-col w-full items-center space-y-4">


      {isLoading ?
        (
          <div className="flex flex-col items-center justify-center w-full h-96">
            <Spin size="large" tip="Đang tìm kiếm..." />
          </div>
        )
        :
        searchResults.length === 0 ?
          (
            <div className="flex flex-col items-center justify-center w-full h-96">
              <img src={noResult} alt="not found" className="w-32 h-auto" />
              <p className="text-lg text-black mt-6">Không tìm thấy kết quả nào phù hợp với yêu cầu của bạn</p>
              <p className="text-gray-500">Bạn có thể đặt lại bộ lọc</p>
            </div>
          )
          :
          (
            <>
              <SearchStatus
                location={location}
                found={searchResults.length}
                onChange={(value) => setSortBy(value)}
                isListView={isListView}
                setIsListView={setIsListView}
              />
              <div className={isListView ? "flex flex-col w-full space-y-4" : "grid grid-cols-3 gap-4"}>
                {searchResults.map((product, index) => (
                  <ProductCard key={index} product={product} isLoading={isLoading} isListView={isListView} />
                ))}
              </div>
              <Pagination
                pageSize={6}
                current={currentPage}
                total={totalResults}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </>
          )
      }
    </div>
  );
};

export default SearchResults;