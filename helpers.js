import crypto from "crypto";

export const generateSecretKey = () => {
  const secret = crypto.randomBytes(64).toString("hex");
  return secret;
};
