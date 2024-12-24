import React, { useState, useEffect } from 'react';
import { Table, Button, Select } from 'antd';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data from an API or database
    // For demonstration, using static data
    const fetchData = async () => {
      const data = [
        {
          bookingId: '1',
          roomId: '101',
          customerName: 'John Doe',
          customerPhone: '123-456-7890',
          roomPrice: '$100',
        },
        {
          bookingId: '2',
          roomId: '102',
          customerName: 'Jane Smith',
          customerPhone: '987-654-3210',
          roomPrice: '$120',
        },
      ];
      setBookings(data);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
    },
    {
      title: 'Room ID',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: "Customer's Name",
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: "Customer's Phone",
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: "Room's Price",
      dataIndex: 'roomPrice',
      key: 'roomPrice',
    },
    {
      title: 'Status',
      key: 'status',
      render: (text, record) => (
        <Select defaultValue="booked" style={{ width: 120 }}>
          <Select.Option value="booked">Đã thanh toán</Select.Option>
          <Select.Option value="checked-in">Đã trả phòng</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Table dataSource={bookings} columns={columns} rowKey="bookingId" />
  );
};

export default BookingManagement;