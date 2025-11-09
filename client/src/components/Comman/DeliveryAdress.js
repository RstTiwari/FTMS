import React, { useEffect } from "react";
import { Form, Input, Select, Collapse } from "antd";
import CoustomerData from "Data/CoustomerData";

const { Option } = Select;
const { Panel } = Collapse;



const DeliveryAddressDropdown = ({
   value = {}, onChange
}) => {
     const handleChange = (changedValues) => {
    if (onChange) {
      onChange({ ...value, ...changedValues });
    }
  };

    // ✅ Inline styles
    const styles = {
        collapse: {
            width: "22vw",
        },
        panel: {
            backgroundColor: "#fff",
        },
        formContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "14px", // even spacing between items
        },
        label: {
            fontWeight: 500,
            color: "#444",
            marginBottom: "4px",
        },
        input: {
            borderRadius: "6px",
            padding: "6px 10px",
            width: "100%",
        },
        select: {
            borderRadius: "6px",
            width: "100%",
        },
    };

    return (
        <Collapse style={styles.collapse} defaultActiveKey={["1"]}>
            <Panel key="1" style={styles.panel}>


                <>
                    <Form.Item  required>
                        <Input
                            value={value.to || ""}
                            onChange={(e) => handleChange({ to: e.target.value })}
                            placeholder="Company name"
                        />
                    </Form.Item>

                    <Form.Item  required>
                        <Input
                            value={value.street1 || ""}
                            onChange={(e) => handleChange({ street1: e.target.value })}
                            placeholder="Street 1"
                        />
                    </Form.Item>

                    <Form.Item >
                        <Input
                            value={value.street2 || ""}
                            onChange={(e) => handleChange({ street2: e.target.value })}
                            placeholder="Street 2"
                        />
                    </Form.Item>

                    <Form.Item  required>
                        <Input
                            value={value.city || ""}
                            onChange={(e) => handleChange({ city: e.target.value })}
                            placeholder="City"
                        />
                    </Form.Item>

                    <Form.Item  required>
                        <Input
                            value={value.pincode || ""}
                            onChange={(e) => handleChange({ pincode: e.target.value })}
                            placeholder="Pincode"
                        />
                    </Form.Item>

                    <Form.Item  required>
                        <Select
                            value={value.state || undefined}
                            onChange={(v) => handleChange({ state: v })}
                            placeholder="Select state"
                        >
                            {CoustomerData.states.map(
                                (st) => (
                                    <Select.Option key={st.value} value={st.value}>
                                        {st.label}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>
                </>

            </Panel>
        </Collapse>
    );
};

export default DeliveryAddressDropdown;
