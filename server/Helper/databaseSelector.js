import leadDb from "../models/appModels/lead.js";
import customerDb from "../models/appModels/customer.js";
import productDb from "../models/appModels/product.js";
import quoteDb from "../models/appModels/quotation.js";
import invoiceDb from "../models/appModels/invoice.js";
import paymentDb from "../models/appModels/paymentsReceived.js";
import paymentsMade from "../models/appModels/paymentsMade.js";
import expensesDb from "../models/appModels/expenses.js";
import deliveryChallanDb from "../models/appModels/challan.js";
import vendorDb from "../models/appModels/vendor.js";
import purchaseDb from "../models/appModels/purchase.js";
import tenantDb from "../models/coreModels/Tenant.js";
import tenantData from "../models/coreModels/tenantData.js";
import counters from "../models/appModels/counters.js";
import customSelect from "../models/appModels/customSelect.js";
import workorders from "../models/appModels/workOrder.js";
import User from "../models/coreModels/User.js";
import Comment from "../models/appModels/comment.js";
import columnPrefrence from "../models/appModels/columnPrefrence.js";

const dbMapping = {
    customers: customerDb,
    leads: leadDb,
    products: productDb,
    quotations: quoteDb,
    invoices: invoiceDb,
    paymentsreceived: paymentDb,
    paymentsmade: paymentsMade,
    expenses: expensesDb,
    challans: deliveryChallanDb,
    vendors: vendorDb,
    purchases: purchaseDb,
    tenant: tenantDb,
    tenantData: tenantData,
    counters: counters,
    customSelect: customSelect,
    workorders: workorders,
    user: User,
    comments: Comment,
    columnPreference:columnPrefrence

};

const checkDbForEntity = (entity) => dbMapping[entity] || false;

export default checkDbForEntity;
