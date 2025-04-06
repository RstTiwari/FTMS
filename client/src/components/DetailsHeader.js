import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const DetailsHeader = ({ values }) => {
  const { entity, tenantId, pageNo, pageSize, id } = useParams();
  let navigate = useNavigate();

  return (
    <>
      <Row>
        <Col
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CloseOutlined
            onClick={() =>
              navigate(`/app/${tenantId}/${entity}/${pageNo}/${pageSize}`)
            }
            style={{
              color: "red",
              cursor: "pointer",
              fontSize: 16,
              padding: "5px 20px",
              borderRadius: 4,
              backgroundColor: "#fff",
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default DetailsHeader;
