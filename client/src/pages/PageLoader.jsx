import React from 'react';
import { Spin } from 'antd';

const PageLoader = () => {
  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems: "center",
      height:"100vh",
      top:"50%",
      left:"50%"
    }}>
      <Spin size="large" />
    </div>
  );
};
export default PageLoader;
