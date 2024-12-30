import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import paths from "../../const/paths";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate(paths.home)}>
          Back Home
        </Button>
      }
    />
  );
};

export default Unauthorized;