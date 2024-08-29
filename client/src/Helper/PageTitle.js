const hederTitleMap = {
    customers: "Customer",
    quotations: "Quotation",
    invoices: "Invoice",
    paymentsreceived: "Payment Received",
    paymentsmade: "Payment Made",
    expenses: "Expense",
    vendors: "Vendor",
    purchases: "Purchase Order",
    workorders: "Work Order",
    products: "Product",
    challans: "Delivery Challan",
    user: "Dashboard User",

};


export const  fetchTitleName =(entity)=>{
    return hederTitleMap[entity]
}
