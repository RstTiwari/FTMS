import React from "react";
import { Descriptions, Typography, Image, Collapse, Row, Col } from "antd";
import { Link, useParams } from "react-router-dom";

const { Title } = Typography;
const { Panel } = Collapse;

const ProductDetails = ({ values }) => {
    const itemType = values?.itemType;
    const { tenantId, pageSize, pageNo } = useParams();

    const renderProductDetails = (index, product, qty) => (
        <>
            <Row>
                <Col span={1}>#</Col>
                <Col span={15}>Name</Col>
                <Col span={4}>Qty</Col>
            </Row>
            <Row>
                <Col span={1}>{index + 1}</Col>
                <Col span={15}>
                    <Link
                        to={`/app/${tenantId}/products/${pageNo}/${pageSize}/details/${product?._id}`}
                    >
                        {product?.name}
                    </Link>
                </Col>
                <Col span={4}>{qty}</Col>
            </Row>
        </>
    );

    return (
        <div>
            <Title level={3} style={{ textAlign: "center" }}>
                PRODUCT DETAILS
            </Title>
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Product Type" span={4}>
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

            <Collapse bordered={false}>
                {itemType === "product" && values?.components?.length > 0 && (
                    <Panel header="Assembly Components" key="1">
                        {values.components.map((component, index) => (
                            <div key={index}>
                                {renderProductDetails(
                                    index,
                                    component.product,
                                    component.qty
                                )}
                            </div>
                        ))}
                    </Panel>
                )}
                {(itemType === "product" || itemType === "assembly") && (
                    <>
                        {values?.parts?.length > 0 && (
                            <Panel header="Parts" key="2">
                                {values.parts.map((part, index) => (
                                    <div key={index}>
                                        {renderProductDetails(
                                            index,
                                            part.product,
                                            part.qty
                                        )}
                                    </div>
                                ))}
                            </Panel>
                        )}
                        {values?.hardwares?.length > 0 && (
                            <Panel header="Hardwares" key="3">
                                {values.hardwares.map((hardware, index) => (
                                    <div key={index}>
                                        {renderProductDetails(
                                            index,
                                            hardware.product,
                                            hardware.qty
                                        )}
                                    </div>
                                ))}
                            </Panel>
                        )}
                        {itemType === "product" &&
                            values?.accessories?.length > 0 && (
                                <Panel header="Accessories" key="4">
                                    {values.accessories.map(
                                        (accessory, index) => (
                                            <div key={index}>
                                                {renderProductDetails(
                                                    index,
                                                    accessory.product,
                                                    accessory.qty
                                                )}
                                            </div>
                                        )
                                    )}
                                </Panel>
                            )}
                    </>
                )}
            </Collapse>
        </div>
    );
};

export default ProductDetails;
