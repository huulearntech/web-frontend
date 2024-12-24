import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>
      <Table dataSource={bookings} columns={columns} rowKey="bookingId" />
    </div>
  );
};

export default BookingManagement;