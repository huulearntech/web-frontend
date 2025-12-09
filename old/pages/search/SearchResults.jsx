import { useState, useEffect, useRef } from "react";
import { Select, Segmented, Divider, List, Skeleton } from "antd";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import HotelCard from "../../components/HotelCard";

import { search } from "../../services/searchServices";

// FIXME: Use something instead of react-infinite-scroll-component
// because it overlap the card's shadow on the sides
const SearchResults = () => {
  const [isListView, setIsListView] = useState(true);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // Use a ref to track if the component has loaded data
  // This prevents multiple initial loads due to strict mode in development
  // Remove this along with strict mode when deploy
  const hasLoaded = useRef(false);

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await search({
        // location: "Hanoi",
        // checkInDate: "2023-10-01",
        // checkOutDate: "2023-10-05",
        // adults: 2,
        // children: 0,
        // rooms: 1,
        // filter: {},
        // sortBy: "priceAsc",
        // currentPage: page
      });
      setData(prevData => [...prevData, ...response.data]);
      setTotal(response.total);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      loadMoreData();
    }
  }, []);

  return (
    <div className="flex-1 flex-col space-y-4">
      { /* Search Status Component */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col text-sm">
          <h3 className="font-semibold">Location</h3>
          <Skeleton loading={loading} active title={false} paragraph={{ rows: 1 }} style={{ width: 250 }}>
            <p>{total} nơi lưu trú được tìm thấy</p>
          </Skeleton>

        </div>

        <div className="flex text-xs text-gray-500 items-center">
          <label htmlFor="sort-select" className="text-sm text-gray-500 mr-2">Sắp xếp theo:</label>
          <Select
            id="sort-select"
            onChange={(value) => console.log(value)}
            defaultValue="priceAsc"
            options={[
              { value: "priceAsc", label: "Giá tăng dần" },
              { value: "priceDesc", label: "Giá giảm dần" },
              { value: "rating", label: "Điểm đánh giá" },
              { value: "popularity", label: "Độ phổ biến" },
            ]}
            style={{ width: 150 }}
          />
          <Divider type="vertical" size="large" />
          <label htmlFor="view-mode" className="text-sm text-gray-500 mr-2">Chế độ xem:</label>
          <Segmented
            id="view-mode"
            options={[
              {
                icon: <BarsOutlined />,
                value: 'List',
              },
              {
                icon: <AppstoreOutlined />,
                value: 'Grid',
              },
            ]}
            value={isListView ? 'List' : 'Grid'}
            onChange={(value) => setIsListView(value === 'List')}
          />
        </div>
      </div>

      {        /* Search Result Component */}
      <div id="scrollableDiv" className="w-full h-screen">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < total}
          loader={
            <div className="flex justify-center my-4">
              <Skeleton.Image active />
              <Skeleton title paragraph={{ rows: 4 }} active />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500">
              Đã tải hết dữ liệu
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            grid={{ gutter: [0, 16], column: (isListView ? 1 : 3) }}
            renderItem={(hotel) => (
              <List.Item
                key={hotel.id}
              >
                <HotelCard hotel={hotel} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

    </div>
  );
};

export default SearchResults;