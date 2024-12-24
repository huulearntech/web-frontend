import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    // Fetch initial room data here
    // setRooms(fetchedRooms);
  }, []);


  const handleEdit = (room) => {
    setEditingRoom(room);
  };

  const handleDelete = (roomId) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const columns = [
    { title: 'Room Number', dataIndex: 'roomNumber', key: 'roomNumber' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Availability', dataIndex: 'availability', key: 'availability' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
      <Table dataSource={rooms} columns={columns} rowKey="id" />
  );
};

export default RoomManagement;