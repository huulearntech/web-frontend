import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import paths from '../const/paths';

const SignUp = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Handle sign-in logic here, e.g., API call
  };
  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
    // Handle form submission failure
  }
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-8 gap-16 w-[800px]">
        <div className="flex items-center justify-center w-1/2">
          <img
            src="src/assets/icons/logo_header.svg"
            alt="Logo"
            className="w-64"
          />
        </div>
        <div className="w-1/2">
          <Form
            name="sign_up"
            initialValues={{ remember: true }}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              label="Username"
            >
              <Input placeholder="Eg: John Doe" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
              label="Email"
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              label="Password"
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to={paths.signIn} replace={true}>
                <span className="text-sm">
                  Already have an account? Sign In
                </span>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  )
}
export default SignUp;