import React from 'react';
import { List, Carousel, Table, Button } from 'antd';

const RoomCard = ({ room }) => {
	const { name, images, area, adults, children, amenities, price } = room;

	return (
		<div className="relative flex flex-row w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden duration-300 hover:shadow-blue-300">
			<div className="object-cover h-full w-72 bg-gray-300">
				<Carousel arrows>
					{images.map((image) => (
						<div key={image}>
							<img src={image} alt="room" className="w-full h-64 object-cover rounded-lg" />
						</div>
					))}
				</Carousel>
			</div>
			<div className="flex flex-row p-4 w-full space-x-4 divide-x divide-gray-200">
				<div className="flex flex-col w-full space-y-4">
					<h2 className="text-lg font-semibold line-clamp-2">{name}</h2>
					<div className="flex flex-col h-full justify-end">
						<Table
							pagination={false}
							showHeader={false}
							bordered={true}
							columns={[
								{ title: 'Property', dataIndex: 'property', key: 'property' },
								{ title: 'Value', dataIndex: 'value', key: 'value' },
							]}
							dataSource={[
								{ key: '1', property: 'Diện tích', value: `${area} m²` },
								{ key: '2', property: 'Sức chứa', value: `${adults} người lớn, ${children} trẻ em` },
								{ key: '3', property: 'Tiện nghi', value: amenities.slice(0, 5).join(', ') },
							]}
						/>
					</div>
				</div>
				<div className="flex flex-col w-60 justify-end items-end border-l border-gray-200 space-y-6">
					<p className='font-bold text-lg text-orange-600'>{price} VND</p>
					<Button type="primary" className="font-semibold">
						Book now
					</Button>
				</div>
			</div>
		</div>
	);
};

const AvailableRoomList = ({ rooms, hotelName }) => {
	return (
		<div id='available-rooms' className="w-full rounded-lg shadow-lg bg-white p-4">
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