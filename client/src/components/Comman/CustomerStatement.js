import React from "react";
import { Row } from "antd";
import {
    epochInDDMMYY,
    jsDateIntoDayjsDate,
    localDateString,
} from "Helper/EpochConveter";
import CustomTable from "components/CustomTable";
import LeadgerData from "Data/LeadgerData";
const CustomerStatement = ({ result }) => {    let customerData  = result.customerData
    let  {billingAddress,gstNo,panNo ,name} = customerData
    let address = `${billingAddress?.stree1 ? billingAddress?.stree1 : ""}${
        billingAddress?.street2 ? billingAddress.street2 : ""
    }${billingAddress?.city ? billingAddress.city:""} ${
        billingAddress?.state ? billingAddress.state : ""
} ${billingAddress?.pincode ? billingAddress.pincode : ""}`;

    return (
        <div style={{ padding: "1rem", fontFamily: "Arial" }}>
            <Row justify={"center"}>
                <h2>LEDGER STATEMENT</h2>
            </Row>

            <div style={{ marginBottom: "1rem" }}>
                <Row>
                    <strong>Customer Name: {name.toUpperCase()}</strong>
                </Row>
            <Row>{address}</Row>
                <Row>
                    {gstNo ? `GST NO:${gstNo}  ` : ""}{" "}
                    {panNo ? `PAN NO:${panNo}` : ""}
                </Row>

                <Row justify={"end"}>
                    <strong>Start of Period: </strong>
                    {localDateString(result.startOfPeriod)}
                </Row>
                <Row justify={"end"}>
                    <strong>End of Period: </strong>
                    {localDateString(result.endOfPeriod)}
                </Row>
                <Row justify={"end"}>
                    <strong>Opening Balance :</strong>{" "}
                    {result.openingBalanceAmount}
                </Row>
                <Row justify={"end"}>
                    <strong>
                        {result.type === "customers"
                            ? "Invoice Amount"
                            : "Purchase Amount"}
                        :
                    </strong>
                    {result.totalAmount}
                </Row>
                <Row justify={"end"}>
                    <strong>Total Received:</strong> {result.totalReceived}
                </Row>
            </div>

            <CustomTable
                columns={LeadgerData}
                dataSource={result.data}
                pagination={false}
            />
            <Row justify={"end"}>BALANCE DUE : {result.totalBalanceDue}</Row>
        </div>
    );
};

export default CustomerStatement;
