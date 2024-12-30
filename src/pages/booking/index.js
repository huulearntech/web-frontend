import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';


const BookingPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleBooking = () => {
    // Handle booking logic here
    alert('Booking confirmed!');
  };

  return (
    <div className='bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center'>
      <div className="w-full max-w-7xl min-h-screen p-4">
        <Row gutter={16}>
          <Col span={16}>
            <Card
              title={
                <>
                  <h1 className="text-lg font-semibold">Thông tin liên hệ</h1>
                  {/* <span className='text-sm text-gray-500 font-thin'>Bạn hãy điền chính xác thông tin của mình.</span> */}
                </>}
              className="mb-4">
              <Form layout="vertical" title='Thông tin liên hệ'>
                <Form.Item label="Full Name">
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Card>
            <Card className="mb-4">
              <div className="text-lg">Total Price: ${totalPrice}</div>
              <Button type="primary" onClick={handleBooking} className="mt-4">
                Book
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              cover={<img alt="Room" src="room-image.jpg" />}
              className="mb-4"
            >
              <Card.Meta
                title="Room Name"
                description={
                  <>
                    <p>Amenities: Free WiFi, Breakfast included, Pool</p>
                    <p>Address: 123 Hotel St, City, Country</p>
                  </>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookingPage;