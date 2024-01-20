import React from 'react';
import { Spin,Row,Col } from 'antd';

const PageLoader = ({text}) => {
  return (
      <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
          }}
      >
          <Row>
              <Spin size="large" />
          </Row>
          <Row> {text}</Row>
      </div>
  );
};
export default PageLoader;
