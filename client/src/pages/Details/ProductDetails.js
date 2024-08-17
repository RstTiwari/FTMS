import React from "react";
import { Descriptions, Typography, Image } from "antd";

const { Title } = Typography;

const ProductDetails = ({ values }) => {
    return (
        <div>
            <Title level={3} style={{ textAlign: "center" }}>
                PRODUCT DETAILS
            </Title>
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Product Code">
                    {values?.code || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Product Name">
                    {values?.productName || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Rate">
                    {values?.rate.toFixed(2) || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                    {values?.category || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Receipt">
                    {values?.image ? (
                        <Image
                            src={values.image}
                            alt="Receipt"
                            style={{ maxWidth: "500px", maxHeight: "100px" }}
                        />
                    ) : (
                        "No Image"
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="HSN Code">
                    {values?.hsnCode || ""}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default ProductDetails;
