import { Flex, Form, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import VendorForm from "../../Forms/VendorForm";
import PageLoader from "pages/PageLoader";
import { pageLayout } from "theme";
const ReadVendor = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState("");
    const { readData } = useAuth();
    const { entity, id } = useParams();
    const [form] = Form.useForm();
    let fetchData = async () => {
        const { success, result, message } = await readData({
            entity: entity,
            id: id,
        });
        if (success === 1) {
            setData(result);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

  
    return (
        <Flex
            gap={"middle"}
            vertical
            style={pageLayout}
        >
            <PageLoader
                text={"Fetching Customer Detail Please Waiti"}
                isLoading={isLoading}
            />
            {!isLoading && data ? (
                <>
                    <Header
                        title={` VENDOR DETAILS   - ${data.vendorName}`}
                        subTitle={""}
                        cancelRoute={"vendors"}
                    />
                        <VendorForm handleFormFinish={{}} value={data} disabled={true} notShowCopy={true}  buttonText={"UPDATE VENDORS"}/>
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default ReadVendor;
