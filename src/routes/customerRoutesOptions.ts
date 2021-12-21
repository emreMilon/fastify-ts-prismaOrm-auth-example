import customerCtrl from "../controllers/customerCtrl";

const Customer = {
    type: "object",
    properties: {
      id: { type: "string" },
      customerName: { type: "string" },
      address: { type: "string" },
      telephone: { type: "string" },
      zip: { type: "number" },
    },
  };

export const getCustomesOption = {
    schema: {
      response: {
        201: {
          items: Customer,
        },
      },
    },
    handler: customerCtrl.getCustomers,
  };