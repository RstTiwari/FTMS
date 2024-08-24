import React from "react";
import { Descriptions, Typography, Image, Collapse, Row, Col } from "antd";
import Taglabel from "components/Comman/Taglabel";

const { Title } = Typography;
const { Panel } = Collapse;

const ProductDetails = ({ values }) => {
    const itemType = values?.itemType;

    const renderProductDetails = (product, qty) => (
        <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Code">
                {product?.code || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
                {product?.name || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Dimension">
                {product?.dimension || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Selling Price">
                {product?.rate ? product.rate.toFixed(2) : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Buying Price">
                {product?.purchaseRate ? product.purchaseRate.toFixed(2) : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">{qty}</Descriptions.Item>
        </Descriptions>
    );

    return (
        <div>
            <Title level={3} style={{ textAlign: "center" }}>
                PRODUCT DETAILS
            </Title>
            <Descriptions column={1} bordered>
                {values?.code && (
                    <Descriptions.Item label="Code">
                        {values.code}
                    </Descriptions.Item>
                )}
                {values?.name && (
                    <Descriptions.Item label="Name">
                        {values.name}
                    </Descriptions.Item>
                )}
                {values?.rate && (
                    <Descriptions.Item label="Rate">
                        {values.rate.toFixed(2)}
                    </Descriptions.Item>
                )}
                {values?.purchaseRate && (
                    <Descriptions.Item label="Purchase Rate">
                        {values.purchaseRate.toFixed(2)}
                    </Descriptions.Item>
                )}
                {values?.category && (
                    <Descriptions.Item label="Category">
                        {values.category}
                    </Descriptions.Item>
                )}
                {values?.image && (
                    <Descriptions.Item label="Receipt">
                        <Image
                            src={values.image}
                            alt="Receipt"
                            style={{ maxWidth: "500px", maxHeight: "100px" }}
                        />
                    </Descriptions.Item>
                )}
                {values?.hsnCode && (
                    <Descriptions.Item label="HSN Code">
                        {values.hsnCode}
                    </Descriptions.Item>
                )}
                {values?.dimension && (
                    <Descriptions.Item label="Dimension">
                        {values.dimension}
                    </Descriptions.Item>
                )}
                {values?.vendor && (
                    <Descriptions.Item label="Vendor">
                        {values.vendor?.name || ""}
                    </Descriptions.Item>
                )}
            </Descriptions>

            {/* Components, Parts, and Hardwares lists in dropdown panels */}
            <Collapse bordered={false}>
                {/* Show only if itemType is "multi_assembly" */}
                {itemType === "multi_assembly" && (
                    <>
                        {values?.components?.length > 0 ? (
                            <Panel header="Components" key="1">
                                {values.components.map((component, index) => (
                                    <div key={index} style={{ margin: "20px" }}>
                                        {renderProductDetails(
                                            component.product,
                                            component.qty
                                        )}
                                    </div>
                                ))}
                            </Panel>
                        ) : (
                            <Panel header="Components" key="1">
                                None
                            </Panel>
                        )}
                    </>
                )}

                {/* Show if itemType is "multi_assembly" or "single_assembly" */}
                {(itemType === "multi_assembly" ||
                    itemType === "single_assembly") && (
                    <>
                        {values?.parts?.length > 0 ? (
                            <Panel header="Parts" key="2">
                                {values.parts.map((part, index) => (
                                    <div key={index} style={{ margin: "20px" }}>
                                        {renderProductDetails(
                                            part.product,
                                            part.qty
                                        )}
                                    </div>
                                ))}
                            </Panel>
                        ) : (
                            <Panel header="Parts" key="2">
                                None
                            </Panel>
                        )}
                        {values?.hardwares?.length > 0 ? (
                            <Panel header="Hardwares" key="3">
                                {values.hardwares.map((hardware, index) => (
                                    <div key={index}>
                                        {renderProductDetails(
                                            hardware.product,
                                            hardware.qty
                                        )}
                                    </div>
                                ))}
                            </Panel>
                        ) : (
                            <Panel header="Hardwares" key="3">
                                None
                            </Panel>
                        )}
                    </>
                )}
            </Collapse>
        </div>
    );
};

export default ProductDetails;
