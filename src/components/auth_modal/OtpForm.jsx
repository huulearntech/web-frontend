import { Form, Input, Button } from 'antd';

const OtpForm = ({ form, onSubmit }) => {
  return (
    <div className="relative w-3xl flex flex-col items-center justify-center">
      <div className="flex flex-col w-full mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Nhập mã xác thực</h2>
        <p className="text-gray-500 text-sm"> Vui lòng kiểm tra email của bạn</p>
      </div>
      <Form form={form} onFinish={onSubmit} layout="vertical" className="w-full">
        <div className="flex w-full justify-center">
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please input the OTP!' }]}
          >
            <Input.OTP
              placeholder="OTP"
              maxLength={6}
              formatter={(value) => value.replace(/\D/g, '')}
              autoFocus
              className="w-full p-3 border border-gray-300 rounded"
              inputMode='numeric'
              size='large'
            />

          </Form.Item>
        </div>
        <Form.Item style={{ marginBottom: '12px' }}>
          <Button type="primary" htmlType="submit" className="w-full" size='large'>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OtpForm;