import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import paths from "../const/paths";

const SignIn = () => {
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
            name="sign_in"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              label="Username"
            >
              <Input placeholder="Eg: John Doe" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              label="Password"
            >
              <Input.Password placeholder="At least 8 characters" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="flex flex-col gap-4 mt-4 text-sm">
                <Link to={paths.signUp} replace={true}>
                  Don't have an account? Sign Up
                </Link>
                <Link to={paths.forgotPassword}>
                  Forgot Password?
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  )

};

export default SignIn;