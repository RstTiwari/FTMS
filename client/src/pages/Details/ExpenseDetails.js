import React from 'react';
import { Descriptions, Typography,Image } from 'antd';
import { jsDateIntoDayjsDate } from 'Helper/EpochConveter';

const { Title } = Typography;

const ExpenseDetails = ({ values }) => {
  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>EXPENSE DETAILS</Title>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Expense No">{values?.expenseNo || ''}</Descriptions.Item>
        <Descriptions.Item label="Category Name">{values?.categoryName || ""}</Descriptions.Item>
        <Descriptions.Item label="Expense Date">{jsDateIntoDayjsDate(values?.expenseDate)}</Descriptions.Item>
        <Descriptions.Item label="Amount">{values?.amount.toFixed(2) || ""}</Descriptions.Item>
        <Descriptions.Item label="Receipt">
          {values?.image ? <Image src={values.image} alt="Receipt" style={{ maxWidth: '50%',maxHeight:"10%" }} /> : 'No Receipt'}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Name">{values?.customer?.customerName}</Descriptions.Item>
        <Descriptions.Item label="Work Order No">{values?.worjOrderNo}</Descriptions.Item>

      </Descriptions>
    </div>
  );
};

export default ExpenseDetails;
