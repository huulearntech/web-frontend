import { Button, Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const AuthForm = ({ form, isSignUp, isLoading, onSubmit }) => {
  return (
    <div className="relative w-3xl flex flex-col items-center justify-center">
      <div className="flex w-full items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{isSignUp ? "Đăng ký" : "Đăng nhập"}</h2>
      </div>
      <Form form={form} onFinish={onSubmit} layout="vertical" className="w-full" disabled={isLoading}>
        {isSignUp && (
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên của bạn!' }]}
            style={{ marginBottom: '12px' }}
          >
            <Input size='large' />
          </Form.Item>
        )}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
          style={{ marginBottom: '12px' }}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' },
          { min: 8, message: 'Mật khẩu phải chứa ít nhất 8 ký tự!' },
          ]}
          style={{ marginBottom: '12px' }}
        >
          <Input.Password
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            size='large'
          />
        </Form.Item>
        {isSignUp && (
          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu của bạn!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                },
              }),
            ]}
            style={{ marginBottom: '12px' }}
          >
            <Input.Password
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              size='large'
            />
          </Form.Item>
        )

        }
        <Form.Item style={{ marginBottom: '12px' }}>
          <Button type="primary" htmlType="submit" className="w-full" size='large'>
            {isSignUp ? "Đăng ký" : "Đăng nhập"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;