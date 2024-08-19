import React from "react";
import { Card, Col, Row, Divider, List, Tag, Typography } from "antd";
import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";

const QuotationDetails = ({ quotation }) => {
    if (!quotation) return null;

    const {
        customer,
        no,
        status,
        quoteDate,
        expiryDate,
        items,
        grossTotal,
        taxAmount,
        grandTotal,
        salesPerson,
        sub,
        deliveryCondition,
        validityCondition,
        paymentsCondition,
        cancellationCondition,
    } = quotation;

    const statusColors = {
        DRAFT: "gray",
        SEND: "blue",
        CANCELLED: "red",
        ON_HOLD: "orange",
    };

    const { billingAddress, shippingAddress } = customer;

    return (
        <Card title={`Quotation #${no}`} bordered={false}>
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
                            Quote Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(quoteDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            Expiry Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(expiryDate)}`}
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
            {/* Additional Fields for Quotation */}
            {salesPerson && (
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Typography.Text strong>Sales Person:</Typography.Text>
                        <Typography.Text>{salesPerson}</Typography.Text>
                    </Col>
                </Row>
            )}
            {sub && (
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Typography.Text strong>Subject:</Typography.Text>
                        <Typography.Text>{sub}</Typography.Text>
                    </Col>
                </Row>
            )}

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
                            <Col span={9}>
                                <Typography.Text>
                                    {item.description}
                                </Typography.Text>
                            </Col>
                            <Col span={5}>{item.rate}</Col>
                            <Col span={5}>{item.qty}</Col>
                            <Col span={5}>{item.finalAmount}</Col>
                        </Row>
                    </List.Item>
                )}
                header={
                    <Row style={{ width: "100%", fontWeight: "bold" }}>
                        <Col span={9}>Description</Col>
                        <Col span={5}>Rate</Col>
                        <Col span={5}>Quantity</Col>
                        <Col span={5}>Amount</Col>
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

            {/* Conditions Section */}
            {(deliveryCondition ||
                validityCondition ||
                paymentsCondition ||
                cancellationCondition) && (
                <>
                    <Divider />
                    <Typography.Title level={5}>
                        Terms and Conditions
                    </Typography.Title>
                    {deliveryCondition && (
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Typography.Text strong>
                                    Delivery Condition:
                                </Typography.Text>
                                <Typography.Paragraph>
                                    {deliveryCondition}
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                    )}
                    {validityCondition && (
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Typography.Text strong>
                                    Validity Condition:
                                </Typography.Text>
                                <Typography.Paragraph>
                                    {validityCondition}
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                    )}
                    {paymentsCondition && (
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Typography.Text strong>
                                    Payments Condition:
                                </Typography.Text>
                                <Typography.Paragraph>
                                    {paymentsCondition}
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                    )}
                    {cancellationCondition && (
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Typography.Text strong>
                                    Cancellation Condition:
                                </Typography.Text>
                                <Typography.Paragraph>
                                    {cancellationCondition}
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </Card>
    );
};

export default QuotationDetails;
