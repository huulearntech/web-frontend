import { List, Carousel, Table, Button, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
	const { name, images, area, adults, children, amenities, price } = room;

	return (
		<div className="flex flex-col space-y-4 w-full max-w-7xl bg-white rounded-lg p-4 shadow-md"
			style={{
				backgroundImage: "url(https://ik.imagekit.io/tvlk/image/imageResource/2023/12/22/1703230740804-7c3d1c3e64557331e6f5f66d7a28e262.svg?tr=h-420,q-75,w-467)",
				backgroundRepeat: 'no-repeat'
			}}
		>
			<h2 className="text-lg font-semibold line-clamp-2">{name}</h2>
			<div className="flex w-full space-x-4">
				<div className="flex flex-col w-2/7">
					<Image.PreviewGroup preview={{toolbarRender: () => null}}>
						<Carousel arrows infinite={false} style={{ borderRadius: '8px', overflow: 'hidden' }}>
							{images.map((image) => (
								<Image
									key={image}
									src={image}
									alt={name}
									preview={{ mask: null }}
									fallback="https://via.placeholder.com/150"
								/>
							))}
						</Carousel>
					</Image.PreviewGroup>
					<div className="inline-flex my-4">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcHotelRoomMeasure"><path d="M12 21H7L21 7V21H18M12 21V20M12 21H15M15 21V20M15 21H18M18 21V20M15 17H17V15" stroke="#0194F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 8L9 9M8 8L5 11M8 8L11 5M5 11L6 12M5 11L2 14L5 17L17 5L14 2L11 5M11 5L12 6" stroke="#03121A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
						<span className="ml-2">{area} m²</span>
					</div>
					<ul className="grid grid-cols-2 gap-2">
						{amenities.map((amenity, index) => (
							<li key={index} className="flex items-center">
								<span>{amenity}</span>
							</li>
						))}
					</ul>
				</div>

				<Table
				 	bordered
					pagination={false}
					style={{ flex: 1 }}
					columns={[
						{ title: 'Lựa chọn phòng', dataIndex: 'selection', key: 'selection', align: 'left' },
						{ title: 'Khách', dataIndex: 'guests', key: 'guests', align: 'center' },
						{ title: 'Giá/phòng/đêm', dataIndex: 'price', key: 'price', align: 'right' },
						{
							key: 'action',
							align: 'center',
							render: () =>
							<Link to="/checkout" className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
									Chọn
							</Link>
						},
					]}
					dataSource={[
						{ key: '1', selection: 'Không bao gồm bữa sáng', guests: <UserOutlined />, price: '100$' },
						{ key: '2', selection: 'Bao gồm bữa sáng', guests: <UserOutlined />, price: '200$' },
					]}
					
				/>
			</div>
		</div>
	);
};

const AvailableRoomList = ({ rooms, hotelName }) => {
	return (
		<div id='available-rooms'>
			<h1 className="text-xl font-bold mb-4">Những phòng còn trống tại {hotelName}</h1>
			<List
				grid={{ gutter: 16, column: 1 }}
				dataSource={rooms}
				renderItem={room => (
					<List.Item>
						<RoomCard room={room} />
					</List.Item>
				)}
			/>
		</div>
	);
};

export default AvailableRoomList;