import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useAuth } from "../../state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useParams } from "react-router-dom";

const BankSelect = ({
    width = "15vw",
    updateInForm,
    preFillValue,
}) => {
    const { tenantId } = useParams(); // ✅ GET FROM URL

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(preFillValue || "");
    const [isLoading, setIsLoading] = useState(false);

    const { adminApiCall } = useAuth();

    // 🔥 FETCH BANK DATA
    const fetchBanks = async () => {
        if (!tenantId) return;

        setIsLoading(true);

        try {
            const response = await adminApiCall(
                "get",
                "read",
                {},
                {
                    entity: "tenant",
                    tenantId: tenantId,
                }
            );

            if (!response.success) {
                return NotificationHandler.error("Failed to fetch banks");
            }

            const tenant = response.result;

            const bankOptions =
                tenant?.bankDetails?.map((bank) => ({
                    label: bank.bankName,
                    value: bank.bankName,
                })) || [];
            bankOptions.push({ label: "CASH", value: "CASH" })

            setOptions(bankOptions);
        } catch (error) {
            NotificationHandler.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBanks();
    }, [tenantId]);

    useEffect(() => {
        if (preFillValue) {
            setValue(preFillValue);
        }
    }, [preFillValue]);

    const handleChange = (val) => {
        console.log(val)
        setValue(val);
        updateInForm(val);
    };

    return (
        <AutoComplete
            value={value}
            options={options}
            style={{ width }}
            onChange={handleChange}
            placeholder="Select Bank"
            allowClear
            loading={isLoading}
            filterOption={(inputValue, option) =>
                option.value
                    .toUpperCase()
                    .includes(inputValue.toUpperCase())
            }
        />
    );
};

export default BankSelect;