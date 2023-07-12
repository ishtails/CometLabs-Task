import axios from "axios";

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

export const addProblem = async () => {
  const myProblem = {
    name: "myProblem",
    body: "Description of myProblem",
    typeId: 0,
    masterjudgeId: 1000,
    interactive: false,
  };

  const result = await axios.post(
    `${process.env.SPHERE_ENDPOINT}/problems`,
    myProblem,
    {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
      },
    }
  );

  console.log(result);
};

export const editProblem = async () => {
  const problemId = 116534;

  const updateObj = {
    name: "myProblem_updated",
  };

  const result = await axios.put(
    `${process.env.SPHERE_ENDPOINT}/problems/${problemId}`,
    updateObj,
    {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
      },
    }
  );

  console.log(result);
};

export const deleteProblem = async () => {
  const problemId = 116534;

  const result = await axios.delete(
    `${process.env.SPHERE_ENDPOINT}/problems/${problemId}`,
    {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
      },
    }
  );

  console.log(result);
};

export const addTestcase = async () => {
  const problemId = 116534;

  const myTestcase = {
    input: "input_myTestcase_1",
    output: "output_myTestcase_1",
    timeLimit: 1,
    judgeId: 3,
    active: true,
  };

  const result = await axios.post(
    `${process.env.SPHERE_ENDPOINT}/problems/${problemId}/testcases`,
    myTestcase,
    {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
      },
    }
  );

  console.log(result);
};

export const updateTestcase = async () => {
    const problemId = 116534;
    const testcaseNumber = 0;
  
    const myTestcase = {
      input: "input_myTestcase_1_updated",
      output: "output_myTestcase_1_updated",
      timeLimit: 2,
      judgeId: 4,
      active: false,
    };
  
    const result = await axios.put(
      `${process.env.SPHERE_ENDPOINT}/problems/${problemId}/testcases/${testcaseNumber}`,
      myTestcase,
      {
        params: {
          access_token: process.env.SPHERE_PROBLEM_TOKEN,
        },
      }
    );
  
    console.log(result);
  };
