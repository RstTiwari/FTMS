import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound({ entity = '' }) {

  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title={'error_404'}
      subTitle='Sorry the Page you requested does not exist'
      style={{backgroundColor:"#fff"}}
      
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          {'Back'}
        </Button>
      }
    />
  );
}
