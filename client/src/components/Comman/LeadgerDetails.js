import React, { useState } from "react";
import { Select, DatePicker, Space, Button ,Col,Row} from "antd";
import CoustomButton from "./CoustomButton";
import NotificationHandler from "EventHandler/NotificationHandler";
import { getPeriodRange } from "../../Helper/EpochConveter";
import { useAuth } from "state/AuthProvider";
import CustomerStatement from "./CustomerStatement";
import PageLoader from "pages/PageLoader";
import { PDFDownloadLink } from '@react-pdf/renderer';
import CustomerStatementPDF from '../../PdfTemplates/Customerstamentpdf';

const { RangePicker } = DatePicker;

const periodOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "this_week" },
    { label: "Last Week", value: "last_week" },
    { label: "This Month", value: "this_month" },
    { label: "Last Month", value: "last_month" },
    { label: "Last 3 Months", value: "last_three_month" },
    { label: "Last 6 Months", value: "last_six_month" },
    { label: "This Year", value: "this_year" },
    { label: "Previous Year", value: "previous_year" },
    { label: "Custom", value: "custom" },
];

const LeadgerDetails = ({ id, type }) => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [data, setData] = useState();
    const [customRange, setCustomRange] = useState(null);
    const { appApiCall } = useAuth();

    const fetchLedgerData = async (startOfPeriod, endOfPeriod) => {
        let response = await appApiCall(
            "get",
            "getLedger",
            {},
            {
                id: id,
                type: type,
                startOfPeriod: startOfPeriod,
                endOfPeriod: endOfPeriod,
            }
        );
        setData(response.result);
    };

    const handleSelectChange = (value) => {
        setSelectedPeriod(value);
        if (value !== "custom") {
            setCustomRange(null);
            let { startOfPeriod, endOfPeriod } = getPeriodRange(value);
            fetchLedgerData(startOfPeriod, endOfPeriod);
        }
    };

    const handleOkClick = () => {
        if (!customRange || customRange.length !== 2) {
            NotificationHandler.warning({
                content: "Please select a valid custom date range.",
            });
            return;
        }
        const [startDate, endDate] = customRange;
        let startOfPeriod = startDate.startOf("day").toISOString();
        let endOfPeriod = endDate.endOf("day").toISOString();
        fetchLedgerData(startOfPeriod, endOfPeriod);
    };

    return (
        <>
            <Space direction="horizontal" align="start" size="middle">
                <Select
                    style={{ width: 200 }}
                    placeholder="Select Period"
                    options={periodOptions}
                    onChange={handleSelectChange}
                    value={selectedPeriod}
                />
                {selectedPeriod === "custom" && (
                    <Space direction="horizontal">
                        <RangePicker
                            onChange={(dates) => setCustomRange(dates)}
                            value={customRange}
                            placement="bottomLeft"
                        />
                        <CoustomButton
                            text={"APPLY"}
                            details={true}
                            onClick={handleOkClick}
                        />
                    </Space>
                )}
            </Space>
            {data ? (
                <Col>
                    <Row justify={"end"}>
                        <PDFDownloadLink
                            document={<CustomerStatementPDF result={data} />}
                            fileName={`${data.customerName}_statement.pdf`}
                        >
                            {({ loading }) =>
                                loading ? "Loading..." : "Download PDF"
                            }
                        </PDFDownloadLink>
                    </Row>
                    <CustomerStatement result={data} />
                </Col>
            ) : (
                <PageLoader text={".loading"} />
            )}
        </>
    );
};

export default LeadgerDetails;
