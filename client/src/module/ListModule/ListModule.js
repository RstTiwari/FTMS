import CoustomerData from "Data/CoustomerData";
import quotationData from "Data/QuotationData";
import leadtData from "Data/LeadData";
import invoiceData from "Data/InvoiceData";
import challanData from "Data/Challan";
import purchaseData from "Data/PurchaseData";
import vendorData from "Data/VendorData";
import paymentReceivedData from "Data/PaymentReceivedData";
import paymentMadeData from "Data/PaymnetMadeData";

import productData from "Data/ProductData";
import expenseData from "Data/ExpensesData";

const ListModule = (entity) => {
    let data = null;
    switch (entity) {
        case "customers":
            data = CoustomerData;
            break;
        case "quotations":
            data = quotationData;
            break;
        case "leads":
            data = leadtData;
            break;
        case "invoices":
            data = invoiceData;
            break;

        case "challans":
            data = challanData;
            break;
        case "purchases":
            data = purchaseData;
            break;
        case "vendors":
            data = vendorData;
            break;
        case "paymentsrecived":
            data = paymentReceivedData;
            break;
        case "paymentsmade":
            data = paymentMadeData;
            break;
        case "products":
            data = productData;
            break;
        case "expenses":
            data = expenseData;
        default:
            break;
    }
    if (data == null) {
        return {};
    }

    return data;
};

export default ListModule;
