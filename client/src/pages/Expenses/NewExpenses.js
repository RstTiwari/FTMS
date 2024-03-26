import NotificationHandler from "EventHandler/NotificationHandler";
import ExpenseForm from "Forms/ExpenseForm";
import { epochConveter } from "Helper/EpochConveter";
import { Flex } from "antd";
import Header from "components/Header";
import React, { useState } from "react";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";
import SaveBottmComponent from "components/SaveBottomComponent";
const entity = "expenses";
const NewExpenses = () => {
    const { createData } = useAuth();
    const navigate = useNavigate();
    const handleFormFinish = async (value) => {
        value.expenseDate =  epochConveter(value.expenseDate.$d);
        console.log(value);
        const payload = { entity: entity, value };
        const { success, result, message } = await createData(payload);
        if (!success) {
            return NotificationHandler.error(message);
        } else {
            NotificationHandler.success(message);
            navigate("/expenses");
        }
    };
    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Header title={"Add New Expenses"} cancelRoute={"expenses"} />
            <ExpenseForm handleFormFinish={handleFormFinish} />
        </Flex>
    );
};

export default NewExpenses;
