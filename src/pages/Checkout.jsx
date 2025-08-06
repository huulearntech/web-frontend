import { useState } from 'react';
import {
 Form, Input, Row, Col, Steps, Divider, Radio, Select, Tooltip, Carousel
} from 'antd';

import { tvlk_header_logo } from '../assets/icons/iconUrl';

const Checkout = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [bookForSelf, setBookForSelf] = useState(true);

  const handleBooking = () => {
    // Handle booking logic here
    alert('Booking confirmed!');
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-white">
        <div className="mx-auto w-full max-w-7xl p-4 flex items-center justify-between">
          <a href="/" className="text-blue-500 font-bold text-xl">
            <img src={tvlk_header_logo} alt="Logo" />
          </a>

          <Steps
            current={0}
            size='small'
            responsive={false}
            style={{ width: '400px' }}
            items={[
              { title: 'Đặt' },
              { title: 'Thanh toán' },
              { title: 'Gửi phiếu xác nhận' }
            ]}
          />
        </div>
      </header>

      <main className='bg-gray-100 w-full min-h-screen flex flex-col items-center my-4'>
        <div className="w-full max-w-6xl mb-8">
          <h1 className="text-2xl font-bold mt-6 mb-4">Đặt phòng của bạn</h1>
          <p className="text-gray-500 font-medium">
            Hãy đảm bảo tất cả thông tin chi tiết trên trang này đã chính xác trước khi tiến hành thanh toán.
          </p>
        </div>

        <div className="w-full max-w-6xl">
          <Row gutter={20}>
            <Col span={15}>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Thông tin liên hệ (đối với E-voucher)</h1>
                <p className="text-gray-500 mb-4">
                  Hãy điền chính xác tất cả thông tin để đảm bảo bạn nhận được Phiếu xác nhận đặt phòng (E-voucher) qua email của mình.
                </p>
                <Form layout="vertical">
                  <Form.Item label="Tên đầy đủ (theo Hộ chiếu/Thẻ căn cước công dân)">
                    <Input
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      size='large'
                    />
                  </Form.Item>
                  <Row gutter={20}>
                    <Col span={12}>
                      <Form.Item label="Email" width="50%">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          size='large'
                          placeholder="Ví dụ: email@example.com"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Số điện thoại" width="50%">
                        <Input
                          addonBefore={
                            <Select
                              defaultValue="+84"
                              style={{ width: 70 }}
                              options={[
                                { value: '+84', label: '+84' },
                                { value: '+1', label: '+1' },
                                { value: '+44', label: '+44' },
                              ]}
                              size='large'
                            />
                          }
                          label="Phone"
                          type="tel"
                          value={phone}
                          inputMode='tel'
                          onChange={(e) => setPhone(e.target.value)}
                          size='large'
                          placeholder="Ví dụ: 0123456789"
                        />
                      </Form.Item>
                    </Col>

                  </Row>
                </Form>
                <Radio.Group
                  value={bookForSelf}
                  onChange={(e) => setBookForSelf(e.target.value)}
                  options={[
                    { label: 'Tôi là khách lưu trú', value: true, style: { fontSize: '16px' } },
                    { label: 'Tôi đang đặt cho người khác', value: false, style: { fontSize: '16px' } },
                  ]}
                  style={{ marginTop: '8px' }}
                />
                {
                  !bookForSelf && (
                    <Form.Item
                      layout='vertical'
                      label="Tên đầy đủ của khách"
                      style={{ marginTop: '16px', marginBottom: '0' }}
                    >
                      <Input
                        placeholder="Ví dụ: John Doe"
                        size='large'
                      />
                    </Form.Item>
                  )
                }
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                <div className="text-xl font-bold pb-4">Chi tiết giá</div>
                <div className="flex mb-4">
                  <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/09/13/1663036323265-71c4f62650fd2a96cda8cd045e2ab935.webp?tr=h-16,q-75"
                    className="mr-2 object-contain"
                  />
                  <p className="text-blue-400 font-semibold text-xs">
                    Thuế và phí là các khoản được Traveloka chuyển trả cho khách sạn. Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều khoản và Điều kiện của Traveloka để được giải đáp
                  </p>
                </div>

                <div className="flex justify-between text-base font-medium mb-2">
                  <span>Giá phòng</span>
                  <span className="text-right">1.000.000 VND</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-4">(1x) Classic Double Partial View - Breakfast Included (1 đêm)</p>
                <div className="flex justify-between text-base font-medium mb-4">
                  <span className="flex items-center">
                    Thuế và phí
                    <Tooltip title="Thuế và phí là các khoản được Traveloka chuyển trả cho khách sạn. Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều khoản và Điều kiện của Traveloka để được giải đáp">
                      <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/09/13/1663036323265-71c4f62650fd2a96cda8cd045e2ab935.webp?tr=h-16,q-75"
                        className="ml-2 object-contain"
                      />
                    </Tooltip>
                  </span>
                  <span className="text-right">400.000 VND</span>
                </div>

                <Divider />

                <div className="flex justify-between items-center pb-4 text-xl font-semibold">
                  <span>Tổng giá</span>
                  <span className="text-orange-500">1.400.000 VND</span>
                </div>
                <button
                  className="bg-orange-500 text-white text-xl px-3 py-2 rounded-md hover:bg-orange-600 transition-colors
                    font-semibold w-full"
                  onClick={handleBooking}
                >
                  Tiếp tục thanh toán
                </button>
                <p className="text-gray-700 text-xs mt-2 text-center">
                  Bằng cách nhấn nút "Tiếp tục thanh toán", bạn đồng ý với
                  <a href="/terms" className="text-blue-500 underline"> Điều khoản và Điều kiện</a>,
                  <a href="/privacy" className="text-blue-500 underline"> Chính sách quyền riêng tư</a> và
                  <a href="/refund" className="text-blue-500 underline"> Quy trình hoàn tiền</a> chỗ ở của Traveloka.
                </p>
              </div>
            </Col>

            {/* Right Column: Room Details */}
            <Col span={9}>
              <Row gutter={20} className="mb-4">
                <Col span={24}>
                  <div className="bg-white rounded-lg shadow-md">
                    <div className="p-4">
                      <div className="flex justify-between">
                        <span className="font-semibold">Tên khách sạn</span>
                        <span className="text-gray-500">stars</span>
                      </div>
                      <span className="text-gray-500">rating</span>
                    </div>
                    <Carousel
                      dots={false}
                      arrows
                    >
                      <div>
                        <img src="https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-0368d53d73dc502039060197fd00cc0d.jpeg?_src=imagekit&tr=f-jpg,h-150,pr-true,q-90,w-375"
                          alt="Room Image"
                          className="w-full h-36 object-cover"
                        />
                      </div>
                      <div>
                        <img src="https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-7e8a9dff4b30034b68ce464d00985d0a.jpeg?_src=imagekit&tr=f-jpg,h-150,pr-true,q-90,w-375"
                          alt="Room Image"
                          className="w-full h-36 object-cover"
                        />
                      </div>
                    </Carousel>
                    <div className="p-4 flex space-x-2 mb-4">
                      <div className="flex flex-col space-y-1 flex-1 items-center rounded-lg border border-gray-300 p-2">
                        <span className="text-xs text-gray-500">Nhận phòng</span>
                        <span className="text-xs font-semibold">Thời gian nhận</span>
                        <span className="text-xs text-gray-500">Thời điểm nhận</span>
                      </div>
                      <div className="flex flex-col space-y-4 justify-center items-center">
                        <div className="w-full text-xs text-center text-gray-500 border-b border-gray-300 px-2">Số đêm</div>
                      </div>
                      <div className="flex flex-col space-y-1 flex-1 items-center rounded-lg border border-gray-300 p-2">
                        <span className="text-xs text-gray-500">Trả phòng</span>
                        <span className="text-xs font-semibold">Thời gian trả</span>
                        <span className="text-xs text-gray-500">Thời điểm trả</span>
                      </div>
                    </div>

                    <div className="font-semibold line-clamp-2 mb-4">Tên phòng</div>

                    <ul className="text-sm text-gray-500 gap-2">
                      <li>Tiện nghi 1</li>
                      <li>Tiện nghi 2</li>
                      <li>Tiện nghi 3</li>
                    </ul>
                    <Divider />
                    <div className="flex justify-between items-center px-4 pb-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Tổng giá phòng</span>
                        <span className="text-sm text-gray-500">(so phong), (so dem)</span>
                      </div>
                      <span className="text-base text-orange-500 font-semibold">1.400.000 VND</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            {/* End of Right Column */}
          </Row>
          {/* End of Grid */}
        </div>
      </main>
    </div>
  );
};

export default Checkout;