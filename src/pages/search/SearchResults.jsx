import { useState, useEffect } from "react";
import { Select, Segmented, Divider } from "antd";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";

import { Avatar, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResults = () => {
  const [isListView, setIsListView] = useState(true);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(50); // Assuming total results is 50 for this example
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);

    fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`)
      .then(res => res.json())
      .then(res => {
        const results = Array.isArray(res) ? res : [];
        setData([...data, ...results]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="flex-1 flex-col space-y-4">
      {        /* Search Status Component */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col text-sm">
          <h3 className="font-semibold">Location</h3>
          <p>0 nơi lưu trú được tìm thấy</p>
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
      <div id="scrollableDiv" className="overflow-auto h-screen">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={
            <p className="text-center text-gray-500">
              Đã tải hết dữ liệu
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            grid={{ gutter: 16, column: (isListView ? 1 : 3) }}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.name}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

    </div>
  );
};

export default SearchResults;