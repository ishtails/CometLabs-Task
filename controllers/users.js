import axios from "axios";
import problems from "../models/problemModel.js";

export const getAllProblems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const totalCount = await problems.countDocuments();
    const totalPages = Math.ceil(totalCount / 10);

    const result = await problems
      .find()
      .skip((page - 1) * 10)
      .limit(10);

    res.json({
      page,
      totalPages,
      result,
    });
  } catch (error) {
    res
      .status(500)
      .json(error);
  }
};

export const createSubmission = async () => {
  const mySubmission = {
    problemId: 116534,
    source: `
    int main(){
        return 0;
    }`,
    compilerId: 1,
    compilerVersionId: 1,
    tests: "0",
  };

  const result1 = await axios.post(
    `${process.env.SPHERE_ENDPOINT}/submissions`,
    mySubmission,
    {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
      },
    }
  );

  console.log(`Submission ID: ${result1.data.id}`);
};

export const checkResult = async () => {
  const submissionID = 53556597;

  const result2 = await axios.get(
    `${process.env.SPHERE_ENDPOINT}/submissions/${submissionID}`,
    {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
      },
    }
  );

  console.log(result2.data.result);
};
