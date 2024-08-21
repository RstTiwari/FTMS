import React from "react";
import { Card, Col, Row, Divider, List, Tag, Typography } from "antd";
import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";

const InvoiceDetails = ({ invoice }) => {
    if (!invoice) return null;

    const {
        customer,
        no,
        status,
        invoiceDate,
        dueDate,
        items,
        grossTotal,
        taxAmount,
        grandTotal,
        paymentsrecived,
    } = invoice;

    const statusColors = {
        DRAFT: "gray",
        SEND: "blue",
        CANCELLED: "red",
        ON_HOLD: "orange",
        PARTIALLY_PAID: "purple",
        FULL_PAID: "green",
    };
    const { billingAddress, shippingAddress } = customer;

    return (
        <Card title={`Invoice #${no}`} bordered={false}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Typography.Text strong>
                        Customer: {customer?.name}
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
                            Invoice Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(invoiceDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            Due Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(dueDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Typography.Title level={5}>
                        Billing Address
                    </Typography.Title>
                    <Typography.Paragraph>
                        {billingAddress?.street1}
                        <br />
                        {billingAddress?.street2 &&
                            `${billingAddress?.street2},`}
                        <br />
                        {billingAddress?.city}, {billingAddress?.state}-{" "}
                        {billingAddress?.pincode}
                    </Typography.Paragraph>
                </Col>
                <Col span={12}>
                    <Typography.Title level={5}>
                        Shipping Address
                    </Typography.Title>
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
            </Row>

            <Divider />

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
                            <Col span={4}>{item.hsnCode}</Col>
                            <Col span={4}>{item.qty}</Col>
                            <Col span={4}>{item.rate}</Col>
                            <Col span={2}>{item.gstPercent}</Col>
                            <Col span={4}>{item.finalAmount}</Col>
                        </Row>
                    </List.Item>
                )}
                header={
                    <Row style={{ width: "100%", fontWeight: "bold" }}>
                        <Col span={6}>Description</Col>
                        <Col span={4}>HSN Code</Col>
                        <Col span={4}>Quantity</Col>
                        <Col span={4}>Rate</Col>
                        <Col span={2}>GST %</Col>
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
                                Grand Total:
                            </Typography.Text>
                        </Col>
                        <Col span={12}>{grandTotal}</Col>
                    </Row>
                </Col>
            </Row>
            <Divider />
            <Typography.Title level={5}>Payments Recived</Typography.Title>
            <List
                bordered
                dataSource={paymentsrecived}
                renderItem={(payment) => (
                    <List.Item>
                        <Row style={{ width: "100%" }}>
                            <Col span={8}>Payment No: {payment?.no}</Col>
                            <Col span={8}>
                                Date :{" "}
                                {`${jsDateIntoDayjsDate(payment?.paymentDate)}`}
                            </Col>

                            <Col span={8}>Amount: {payment.amount}</Col>
                        </Row>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default InvoiceDetails;
