import React from "react";
import {
  Descriptions,
  Typography,
  Image,
  Collapse,
  Row,
  Col,
  Tabs,
  Form,
  InputNumber,
} from "antd";
import { Link, useParams } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";

const { Title } = Typography;
const { Panel } = Collapse;

const ProductDetails = ({ values }) => {
  const itemType = values?.itemType;
  const { tenantId, pageSize, pageNo } = useParams();

 

  return (
    <div>
      <Tabs>
        <TabPane tab="Genral Info" key={1}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Product Type" span={1}>
              {values?.itemType?.toUpperCase() || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Code">
              {values?.code || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {values?.name || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Selling Rate">
              {values?.rate?.toFixed(2) || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Purchase Rate">
              {values?.purchaseRate?.toFixed(2) || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              {values?.image ? (
                <Image
                  src={values?.image}
                  alt="Product"
                  style={{ maxWidth: "500px", maxHeight: "100px" }}
                />
              ) : (
                "No Image Found"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="HSN Code">
              {values?.hsnCode || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Dimension">
              {values?.dimension || ""}
            </Descriptions.Item>
            {values?.vendor && (
              <Descriptions.Item label="Vendor">
                {values.vendor?.name || ""}
              </Descriptions.Item>
            )}
          </Descriptions>
        </TabPane>
        {itemType === "bill_of_material" && (
          <TabPane tab="Bill Of Material">
            {values?.components?.length > 0 && (
              <Col span={12}>
                <Row
                  gutter={[16, 16]}
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Col span={1}>#</Col>
                  <Col span={8}>Name</Col>
                  <Col span={4}>Qty</Col>
                </Row>
                {values.components.map((component, index) => (
                  <Row
                    key={component.product._id}
                    gutter={[16, 16]}
                    style={{
                      borderBottom: "1px solid #e8e8e8",
                      padding: "8px 0",
                      alignItems: "center",
                    }}
                  >
                    <Col span={1} style={{ textAlign: "center" }}>
                      {index + 1}
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      {component?.product?.name}
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                      {component.qty}
                    </Col>
                  </Row>
                ))}
              </Col>
            )}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default ProductDetails;
