import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import AddOrEditRoomModal from './AddOrEditRoomModal';
import roomServices from '../../services/roomServices';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // New state for modal mode

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await roomServices.getAllRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        notification.error({ message: 'Lỗi', description: 'Không thể lấy danh sách phòng' });
      }
    };

    fetchRooms();
  }, []);

  const handleEdit = (room) => {
    setEditingRoom(room);
    setModalMode('edit');
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setEditingRoom(null);
    setModalMode('add');
    setIsEditModalOpen(true);
  };

  const handleDelete = (roomId) => {
    setRoomToDelete(roomId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setRooms(rooms.filter(room => room.id !== roomToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleRoomUpdated = (updatedRoom) => {
    setRooms(prevRooms => 
      prevRooms.map(room => room.id === updatedRoom.id ? updatedRoom : room)
    );
  };

  const handleRoomAdded = (newRoom) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const columns = [
    { title: 'Số Phòng', dataIndex: 'roomNumber', key: 'roomNumber' },
    { title: 'Mô Tả', dataIndex: 'description', key: 'description' },
    { title: 'Loại', dataIndex: 'type', key: 'type' },
    { title: 'Trạng Thái', dataIndex: 'available', key: 'available' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Số Người Lớn', dataIndex: 'numOfAdults', key: 'numOfAdults' },
    { title: 'Số Trẻ Em', dataIndex: 'numOfChildren', key: 'numOfChildren' },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Chỉnh Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm Phòng
      </Button>
      <Table dataSource={rooms} columns={columns} rowKey="id" />
      <AddOrEditRoomModal
        open={isEditModalOpen}
        onClose={handleCancel}
        mode={modalMode}
        roomData={editingRoom}
        onRoomAddedOrUpdated={modalMode === 'edit' ? handleRoomUpdated : handleRoomAdded}
      />
      <Modal
        title="Xác Nhận Xóa"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa phòng này không?</p>
      </Modal>
    </>
  );
};

export default React.memo(RoomManagement);