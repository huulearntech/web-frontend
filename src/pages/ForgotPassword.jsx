import { Steps, Form, Input, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useForgotPasswordContext } from '../contexts/ForgotPasswordContext';

import { tvlk_header_logo } from '../assets/icons/iconUrl';

const EmailStep = () => {
  const { submitForm } = useForgotPasswordContext();
  return (
    <div className="w-1/2">
      <Form
        name="email_forgot_password_form"
        autoComplete="off"
        onFinish={submitForm}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
        >
          <Input
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />} iconPosition="end">
            Tiếp theo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const OtpStep = () => {
  const { submitForm } = useForgotPasswordContext();
  return (
    <div className="w-1/2">
      <Form
        name="email_forgot_password_form"
        autoComplete="off"
        onFinish={submitForm}
      >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please input the OTP!' }]}
          >
            <Input.OTP
              placeholder="OTP"
              maxLength={6}
              formatter={(value) => value.replace(/\D/g, '')}
              autoFocus
              inputMode='numeric'
              size='large'
            />
          </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />} iconPosition="end">
            Tiếp theo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const SetNewPasswordStep = () => {
  const { submitForm } = useForgotPasswordContext();
  return (
    <div className="w-1/2">
      <Form
        onFinish={submitForm}
        layout='vertical'
      >
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[{ required: true, message: "Vui lòng điền vào ô này!" },
          { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" }
          ]}
        >
          <Input.Password placeholder="New Password" autoFocus/>
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng điền vào ô này!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
              },
            })
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Hoàn tất
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const ForgotPassword = () => {
  const { step } = useForgotPasswordContext();

  const renderContent = () => {
    switch (step) {
      case 0:
        return <EmailStep />;
      case 1:
        return <OtpStep />;
      case 2:
        return <SetNewPasswordStep />;
      default:
        return <EmailStep />;
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute -top-20 w-full max-w-xl">
        <Steps current={step}>
          <Steps.Step title="Email" />
          <Steps.Step title="OTP" />
          <Steps.Step title="Đặt mật khẩu mới" />
        </Steps>
      </div>
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-8 gap-16 w-[800px]">
        <div className="flex items-center justify-center w-1/2">
          <img
            src={tvlk_header_logo}
            alt="Logo"
            className="w-64"
          />
        </div>
        {renderContent()}
      </div>
    </main>
  );
};

export default ForgotPassword;