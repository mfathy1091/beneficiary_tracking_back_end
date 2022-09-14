const jwt = require("jsonwebtoken");

const createToken = {
  activation: (payload: any) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, { expiresIn: "5m" });
  },
  refresh: (payload: any) => {
    console.log(payload)
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "1h" });
  },
  access: (payload: any) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "5m" });
  },
};

export default createToken;