import crypto from "crypto";

export const generateSecretKey = () => {
  const secret = crypto.randomBytes(64).toString("hex");
  return secret;
};

export const listCompilers = async () => {
  const result = await axios.get(`${process.env.SPHERE_ENDPOINT}/compilers`, {
    params: {
      access_token: process.env.SPHERE_PROBLEM_TOKEN,
    },
  });

  console.log(result.data);
};
