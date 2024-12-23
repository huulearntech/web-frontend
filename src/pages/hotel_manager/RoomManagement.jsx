import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    // Fetch initial room data here
    // setRooms(fetchedRooms);
  }, []);

  const handleAdd = () => {
    setEditingRoom(null);
    setIsModalVisible(true);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setIsModalVisible(true);
  };

  const handleDelete = (roomId) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const handleOk = (values) => {
    if (editingRoom) {
      setRooms(rooms.map(room => (room.id === editingRoom.id ? { ...editingRoom, ...values } : room)));
    } else {
      setRooms([...rooms, { ...values, id: Date.now() }]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Room Number', dataIndex: 'roomNumber', key: 'roomNumber' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
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
    <div>
      <Button type="primary" onClick={handleAdd}
      className="w-20 h-12">Add Room</Button>
      <Table dataSource={rooms} columns={columns} rowKey="id" />
      <Modal
        title={editingRoom ? 'Edit Room' : 'Add Room'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingRoom}
          onFinish={handleOk}
        >
          <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRoom ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomManagement;