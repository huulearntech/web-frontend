import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import paths from "../const/paths";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(paths.home)}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;