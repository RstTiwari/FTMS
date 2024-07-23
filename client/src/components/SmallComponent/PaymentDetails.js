import React, { useState, useEffect } from 'react';
import { List, Spin, Row, Col } from 'antd';
import Taglabel from './Taglabel';
import PageLoader from 'pages/PageLoader';

const PaymentDetails = ({ apiUrl }) => {
  const [data, setData] = useState([
    { title: "Total Amount", value: 200000, id: "1323" },
    { title: "Total Received", value: 10000, id: "1322" },
    { title: "Total Pending", value: 1000, id: "132123" },
    { title: "Total Advance", value: 0, id: "132123" },
    // Add more items if needed
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) {
    return <PageLoader text="Loading..." isLoading={loading} height='10vh' />;   
  }

  // Function to group items into rows
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groupedData = chunkArray(data, 4);

  return (
    <>
      <Row justify={"center"}>
        <Taglabel text={"Receivables"} type={"heading"} weight={1000} />
      </Row>
      {groupedData.map((row, rowIndex) => (
        <Row key={rowIndex} gutter={16}>
          {row.map((item) => (
            <Col span={6} key={item.id}>
              <div style={{ padding: '8px', border: '1px solid #e8e8e8', borderRadius: '4px' }}>
                <Row>
                    <Taglabel  text={`${item.title}`} weight={900} type={"heading"}/>
                </Row>
                <Row justify={"start"}>
                  <Taglabel text={`₹${item.value}`} weight={300} type={"text"} />
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default PaymentDetails;
