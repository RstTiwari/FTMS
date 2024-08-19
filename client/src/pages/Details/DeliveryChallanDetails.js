import React from "react";
import { Card, Col, Row, Divider, List, Tag, Typography } from "antd";
import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";

const DeliveryChallanDetails = ({ deliveryChallan }) => {
    if (!deliveryChallan) return null;

    const {
        customer,
        no,
        challanDate,
        challanType,
        items,
        grossTotal,
        taxAmount,
        grandTotal,
        transportAmount,
        status,
    } = deliveryChallan;

    const statusColors = {
        DRAFT: "gray",
        SEND: "blue",
        CANCELLED: "red",
        ON_HOLD: "orange",
    };
    const { shippingAddress } = customer;
    return (
        <Card title={`Delivery Challan #${no}`} bordered={false}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Typography.Text strong>
                        Customer: {customer?.name.toUpperCase()}
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
                            Challan Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(challanDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            Challan Type:
                            <Taglabel text={challanType} />
                        </Typography.Text>
                    </Row>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Typography.Title level={5}>Shipping To</Typography.Title>
                    <Typography.Paragraph>
                        {shippingAddress?.street1}
                        <br />
                        {shippingAddress?.street2 &&
                            `${shippingAddress?.street2},`}
                        <br />
                        {shippingAddress?.city}, {shippingAddress?.state} -{" "}
                        {shippingAddress?.pincode}
                    </Typography.Paragraph>
                </Col>
                <Col span={12}>
                    {/* You can add any other relevant details here */}
                </Col>
            </Row>

            <Divider />

            <Typography.Title level={5}>ITEM TABLE</Typography.Title>
            <List
                bordered
                dataSource={items}
                renderItem={(item) => (
                    <List.Item>
                        <Row style={{ width: "100%" }}>
                            <Col span={8}>
                                <Typography.Text>
                                    {item.description}
                                </Typography.Text>
                            </Col>
                            <Col span={4}>{item.qty}</Col>
                            <Col span={4}>{item.rate}</Col>
                            <Col span={4}>{item.gstPercent}</Col>
                            <Col span={4}>{item.finalAmount}</Col>
                        </Row>
                    </List.Item>
                )}
                header={
                    <Row style={{ width: "100%", fontWeight: "bold" }}>
                        <Col span={8}>Description</Col>
                        <Col span={4}>Quantity</Col>
                        <Col span={4}>Rate</Col>
                        <Col span={4}>GST %</Col>
                        <Col span={4}>Amount</Col>
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
                                Transport Amount:
                            </Typography.Text>
                        </Col>
                        <Col span={12}>{transportAmount}</Col>
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

export default DeliveryChallanDetails;
