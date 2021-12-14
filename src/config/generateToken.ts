import jwt from "jsonwebtoken";

const accessToken = process.env.ACCESS_TOKEN_SECRET;
const refreshToken = process.env.REFRESH_TOKEN_SECRET;
const activeToken = process.env.ACTIVE_TOKEN_SECRET;

const generateToken = {
  active: (payload: object) => {
    return jwt.sign(payload, `${activeToken}`, { expiresIn: "5m" });
  },
  access: (payload: object) => {
    return jwt.sign(payload, `${accessToken}`, { expiresIn: "15m" });
  },
  refresh: (payload: object) => {
    return jwt.sign(payload, `${refreshToken}`, { expiresIn: "30d" });
  },
};

export default generateToken;
