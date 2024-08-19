import React from "react";
import { Card, Col, Row, Divider, List, Tag, Typography } from "antd";
import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";

const PurchaseOrderDetails = ({ purchaseOrder }) => {
    if (!purchaseOrder) return null;

    const {
        vendor,
        no,
        purchaseDate,
        deliveryDate,
        items,
        grossTotal,
        taxAmount,
        grandTotal,
        status,
        delivery,
    } = purchaseOrder;

    const statusColors = {
        DRAFT: "gray",
        SEND: "blue",
        CANCELLED: "red",
        ON_HOLD: "orange",
    };

    const { to, address } = delivery;

    return (
        <Card title={`Purchase Order #${no}`} bordered={false}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Typography.Text strong>
                        Vendor: {vendor?.name.toUpperCase()}
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Row>
                        <Typography.Text strong>
                            Status:
                            <Tag
                                style={{ marginLeft: "10px" }}
                                color={statusColors[status]}
                            >
                                {status}
                            </Tag>
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            Purchase Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(purchaseDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            Delivery Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(deliveryDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography.Title level={5}>
                        Delivery Address
                    </Typography.Title>
                    <Typography.Paragraph style={{ marginBottom: 0 }}>
                        {<Taglabel text={to} />}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ marginBottom: 0 }}>
                        {address?.street1}
                        <br />
                        {address?.city}, {address?.state} - {address?.pincode}
                    </Typography.Paragraph>
                </Col>
            </Row>

            <Divider />
            <Row justify={"center"}>
                <Typography.Title level={5}>ITEM TABLE</Typography.Title>
            </Row>

            <List
                bordered
                dataSource={items}
                renderItem={(item) => (
                    <List.Item>
                        <Row style={{ width: "100%" }}>
                            <Col span={6}>
                                <Typography.Text>
                                    {item.description}
                                </Typography.Text>
                            </Col>
                            <Col span={4}>{item.qty}</Col>
                            <Col span={4}>{item.rate}</Col>
                            <Col span={4}>{item.gstPercent}</Col>
                            <Col span={6}>{item.finalAmount}</Col>
                        </Row>
                    </List.Item>
                )}
                header={
                    <Row style={{ width: "100%", fontWeight: "bold" }}>
                        <Col span={6}>Description</Col>
                        <Col span={4}>Quantity</Col>
                        <Col span={4}>Rate</Col>
                        <Col span={4}>GST %</Col>
                        <Col span={6}>Amount</Col>
                    </Row>
                }
            />
            <Divider />
            <Row justify="end">
                <Col span={8}>
                    <Row justify={"end"}>
                        <Col span={12}>
                            <Typography.Text strong>
                                Gross Total:
                            </Typography.Text>
                        </Col>
                        <Col span={12}>{grossTotal}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>
                                Tax Amount:
                            </Typography.Text>
                        </Col>
                        <Col span={12}>{taxAmount}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Typography.Text strong>
                                Grand Total:
                            </Typography.Text>
                        </Col>
                        <Col span={12}>{grandTotal}</Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default PurchaseOrderDetails;
