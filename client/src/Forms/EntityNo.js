import FormItemCol from "components/SmallComponent/FormItemCol";
import React from "react";
import { Row, Typography } from "antd";
const { Text } = Typography;

const EntityNo = () => {
    return (
        <>
         
            <Row
                justify={"start"}
            >
                <FormItemCol
                    tooltip={
                        "Short Name of Your Company   Eg => Miraj Engineering   ME "
                    }
                    label={"Prefix"}
                    name={"prefix"}
                    required={true}
                    rules={[
                        { required: true, message: `Please input Prefix` },
                        {
                            pattern: /^[aA-zZ]*$/,
                            message: "Please enter valid number",
                        }, // Example regex pattern for number validation
                    ]}
                />
                <FormItemCol
                    label={"Next Number"}
                    tooltip={"Next Number Of You Document"}
                    name={"nextNumber"}
                    required={true}
                    rules={[
                        { required: true, message: `Please input Prefix` },
                        {
                            pattern: /^[aA-zZ]*$/,
                            message: "Please enter valid number",
                        }, // Example regex pattern for number validation
                    ]}
                />
            </Row>
            {/* <Row justify={"start"}>
               Eg: <Text type="secondary">ME-0001</Text>
            </Row> */}
        </>
    );
};

export default EntityNo;
