import ExpenseForm from "Forms/ExpenseForm";
import { Flex } from "antd";
import Header from "components/Header";
import React from "react";

const NewExpenses = () => {
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
            <Header
                title={"Add New Expenses"}
                cancelRoute={"expenses"}
            />
            <ExpenseForm />
        </Flex>
    );
};

export default NewExpenses;
