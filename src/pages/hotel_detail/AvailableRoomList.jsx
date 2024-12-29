import React from 'react';
import { List, Card, Carousel, Table, Button } from 'antd';

const RoomCard = ({ room }) => {
	const { name, images, area, price, description } = room;

	return (
		<Card className="shadow-lg rounded-lg p-4">
			<Carousel arrows >
				{images.map((image) => (
					<div key={image}>
						<img src={image} alt="room" className="w-full h-64 object-cover rounded-lg" />
					</div>
				))}
			</Carousel>

			<Table
				className="mt-4"
				pagination={false}
				showHeader={false}
				columns={[
					{ title: 'Property', dataIndex: 'property', key: 'property' },
					{ title: 'Value', dataIndex: 'value', key: 'value' },
				]}
				dataSource={[
					{ key: '1', property: 'Area', value: area },
					{ key: '2', property: 'Price', value: price },
					{ key: '3', property: 'Description', value: description },
				]}
			/>

			<Button type="primary" className="mt-4 w-full">
				Book now
			</Button>
		</Card>
	);
};

const AvailableRoomList = ({ rooms }) => {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Available Room List</h1>
			<List
				grid={{ gutter: 16, column: 4 }}
				dataSource={rooms}
				renderItem={room => (
					<List.Item>
						<Card title={room.name} className="shadow-lg">
							<RoomCard room={room} />
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default AvailableRoomList;