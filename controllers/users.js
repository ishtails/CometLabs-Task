import axios from "axios";

export const listCompilers = async () => {
  const result = await axios.get(`${process.env.SPHERE_ENDPOINT}/compilers`, {
    params: {
      access_token: process.env.SPHERE_PROBLEM_TOKEN,
    },
  });

  console.log(result.data);
};

export const getAllProblems = async () => {  
  const result = await axios.get(
    `${process.env.SPHERE_ENDPOINT}/problems`,
    {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
        limit:5
      },
    }
  );

  console.log(result.data);
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
