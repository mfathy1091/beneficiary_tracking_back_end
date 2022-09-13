const jwt = require("jsonwebtoken");

const createToken = {
  activation: (payload: any) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, { expiresIn: "5m" });
  },
  refresh: (payload: any) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "24h" });
  },
  access: (payload: any) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
  },
};

export default createToken;