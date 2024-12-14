import React from "react";
import { Card, Descriptions, Typography } from "antd";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";
import Taglabel from "components/Comman/Taglabel";

const { Title } = Typography;

const PaymentMade = ({ values }) => {
    return (
        <Card bordered={false}>
            <Title level={3} style={{ textAlign: "center" }}>
                PAYMENT MADE
            </Title>
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Transaction No">
                    {values?.no || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Payee Name">
                    {values?.vendor?.name || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Date">
                    {jsDateIntoDayjsDate(values?.paymentDate || "")}
                </Descriptions.Item>
                <Descriptions.Item label="Amount Paid">
                    ₹{values?.amount.toFixed(2) || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Payment Mode">
                    {values?.paymentMode || ""}
                </Descriptions.Item>
                <Descriptions.Item label="Reference">
                    <Taglabel
                        text={`${values?.ref || ""}`}
                        type={"heading"}
                        weight={100}
                    />
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default PaymentMade;
