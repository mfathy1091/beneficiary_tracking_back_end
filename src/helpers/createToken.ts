const jwt = require("jsonwebtoken");

const createToken = {
  activationToken: (payload: any) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "5m" });
  },
  refreshToken: (payload: any) => {
    console.log(payload)
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
  },

  accessToken: (payload: any) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
  },
};

export default createToken;