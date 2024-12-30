import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, notification } from 'antd';
import roomServices from '../../services/roomServices';

const AddOrEditRoomModal = ({ open, onClose, mode, roomData, onRoomAddedOrUpdated }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && roomData) {
      form.setFieldsValue(roomData);
    } else {
      form.resetFields();
    }
  }, [mode, roomData, form]);

  const handleOk = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      if (mode === 'edit') {
        const updatedRoom = await roomServices.updateRoom(roomData.id, values);
        onRoomAddedOrUpdated(updatedRoom);
        notification.success({ message: 'Thành công', description: 'Cập nhật phòng thành công' });
      } else {
        const newRoom = await roomServices.addRoom(values);
        onRoomAddedOrUpdated(newRoom);
        notification.success({ message: 'Thành công', description: 'Thêm phòng thành công' });
      }
      onClose();
    } catch (error) {
      notification.error({ message: 'Lỗi', description: 'Lưu phòng thất bại' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={mode === 'edit' ? 'Chỉnh sửa phòng' : 'Thêm phòng'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={isLoading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Số phòng"
          name="roomNumber"
          rules={[{ required: true, message: 'Vui lòng nhập số phòng!' }]}
        >
          <Input className='w-full' />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input className='w-full' />
        </Form.Item>
        <Form.Item
          label="Loại"
          name="type"
          rules={[{ required: true, message: 'Vui lòng nhập loại!' }]}
        >
          <Input className='w-full' />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="available"
          rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}
        >
          <Input className='w-full' />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
        >
          <InputNumber min={0} className='w-full' />
        </Form.Item>
        <Form.Item
          label="Người lớn"
          name="numOfAdults"
          rules={[{ required: true, message: 'Vui lòng nhập số người lớn!' }]}
        >
          <InputNumber min={0} className='w-full' />
        </Form.Item>
        <Form.Item
          label="Trẻ em"
          name="numOfChildren"
          rules={[{ required: true, message: 'Vui lòng nhập số trẻ em!' }]}
        >
          <InputNumber min={0} className='w-full' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddOrEditRoomModal;