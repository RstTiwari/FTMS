// import React, { useEffect, useState, useCallback } from "react";
// import { Flex, Form, Select, Table } from "antd";
// import Header from "components/Header";
// import { productColumns } from "Data/ProductData";
// import { useAuth } from "state/AuthProvider";
// import NotificationHandler from "EventHandler/NotificationHandler";
// import { setLocalData, getLocalData } from "Helper/FetchingLocalData";
// import useDataFetching from "Hook/useDataFetching";

// const Index = () => {
//     let entity = "product";
//     const { data, isloading, fetchData } = useDataFetching(entity);
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     return (
//         <Flex
//             gap={"middle"}
//             vertical
//             style={{
//                 padding: "2rem",
//                 backgroundColor: "#ffffff",
//                 borderRadius: "1rem",
//             }}
//         >
//             <Header
//                 title={"Prodcut List"}
//                 subTitle={"ADD PRODCUT"}
//                 addRoute={"products/create"}
//                 localDataKey={"product"}
//                 cancelRoute={"dashboard"}
//                 refresh={true}
//             />
//             <Table
//                 columns={productColumns}
//                 dataSource={data}
//                 loading={isloading}
//                 scroll={{ x: true, y: 600 }}
//                 showSorterTooltip={true}
//             />
//         </Flex>
//     );
// };

// export default Index;
