import forecastCtrl from "../controllers/forecastCtrl";

const Forecast = {
  type: "object",
  properties: {
    forecastId: { type: "number" },
    userId: { type: "string" },
    customerId: { type: "string" },
    customerName: { type: "string" },
    customerTel: { type: "string" },
    customerZip: { type: "number" },
    price: { type: "number" },
  },
};

export const getForeCastsOption = {
  schema: {
    response: {
      201: {
        items: Forecast,
      },
    },
  },
  handler: forecastCtrl.getForecasts,
};

export const getForeCastsasUserOption = {
  schema: {
    response: {
      201: {
        items: Forecast,
      },
    },
  },
  handler: forecastCtrl.getForeCastasUser,
};
