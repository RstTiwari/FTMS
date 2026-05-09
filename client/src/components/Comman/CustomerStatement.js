import React from "react";
import { Row } from "antd";
import {
    epochInDDMMYY,
    jsDateIntoDayjsDate,
    localDateString,
} from "Helper/EpochConveter";
import CustomTable from "components/CustomTable";
import LeadgerData from "Data/LeadgerData";
import vendorLeadgerData from "Data/VendorLeadgerData";
const CustomerStatement = ({ result }) => {    
    console.log(result,"result")
    let customerData  = result.partyData
    let  {billingAddress,gstNo,panNo ,name} = customerData
    let address = `${billingAddress?.stree1 ? billingAddress?.stree1 : ""}${
        billingAddress?.street2 ? billingAddress.street2 : ""
    }${billingAddress?.city ? billingAddress.city:""} ${
        billingAddress?.state ? billingAddress.state : ""
} ${billingAddress?.pincode ? billingAddress.pincode : ""}`;

let data = result.type  =="customers"   ? LeadgerData:vendorLeadgerData
const manageTableChange = (value)=>{
}

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
                    {result.openingBalance}
                </Row>
                <Row justify={"end"}>
                    <strong>
                        {result.type === "customers"
                            ? "Invoice Amount"
                            : "Purchase Amount"}
                        :
                    </strong>
                    {result.totalDebit}
                </Row>
                <Row justify={"end"}>
                    {
                        result.type === "customers" ? (
                            <>
                                <strong>Total Received:</strong> {result.totalCredit ||0}
                            </>
                        ) : (
                            <>
                                <strong>Total Paid:</strong> {result.totalCredit || 0}
                            </>
                        )
                    }

                </Row>
            </div>
        
            <CustomTable
                columns={data}
                dataSource={result.data}
                totalCount={result.data.length}
                onTableChange = {manageTableChange}
            />
            <Row justify={"end"}>BALANCE DUE : {result.closingBalance}</Row>
        </div>
    );
};

export default CustomerStatement;
