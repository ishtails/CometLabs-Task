import axios from "axios";
import Joi from "joi";
import problems from "../models/problemModel.js";

export const addProblem = async (req, res) => {
  try {
    //Request Body Validation
    const problemSchema = Joi.object({
      name: Joi.string().required(),
      body: Joi.string(),
      typeId: Joi.number(),
      masterjudgeId: Joi.number().required(),
      interactive: Joi.boolean(),
    });
    await problemSchema.validateAsync(req.body);

    const result = await axios.post(
      `${process.env.SPHERE_ENDPOINT}/problems`,
      req.body,
      {
        params: {
          access_token: process.env.SPHERE_PROBLEM_TOKEN,
        },
      }
    );

    // Save to DB
    const problemId = result.data.id;
    const newProblem = new problems({ ...req.body, problemId });
    await newProblem.save();

    return res
      .status(200)
      .send("Problem added with problemId: " + result.data.id);
  } catch (error) {
    if (error.details) {
      return res
        .status(422)
        .json(error.details.map((detail) => detail.message).join(", "));
    }
    return res.status(500).send(error);
  }
};

export const editProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    if (!problemId) {
      return res.status(400).send("No problemId provided");
    }

    //Request Body Validation
    const problemSchema = Joi.object({
      name: Joi.string(),
      body: Joi.string(),
      typeId: Joi.number(),
      masterjudgeId: Joi.number(),
      interactive: Joi.boolean(),
    });
    await problemSchema.validateAsync(req.body);

    await axios.put(
      `${process.env.SPHERE_ENDPOINT}/problems/${problemId}`,
      req.body,
      {
        params: {
          access_token: process.env.SPHERE_PROBLEM_TOKEN,
        },
      }
    );

    await problems.updateOne({ problemId }, { $set: req.body });

    return res
      .status(200)
      .send("Problem with problemId: " + problemId + " updated");
  } catch (error) {
    if (error.details) {
      return res
        .status(422)
        .json(error.details.map((detail) => detail.message).join(", "));
    }
    return res.status(500).send(error);
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    await axios.delete(`${process.env.SPHERE_ENDPOINT}/problems/${problemId}`, {
      params: {
        access_token: process.env.SPHERE_PROBLEM_TOKEN,
      },
    });

    await problems.deleteOne({ problemId });

    return res
      .status(200)
      .send("Problem with problemId: " + problemId + " deleted");
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const addTestcase = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    //Request Body Validation
    const registerSchema = Joi.object({
      input: Joi.string(),
      output: Joi.string(),
      timeLimit: Joi.number(),
      judgeId: Joi.number().required(),
      active: Joi.boolean(),
    });
    await registerSchema.validateAsync(req.body);

    const result = await axios.post(
      `${process.env.SPHERE_ENDPOINT}/problems/${problemId}/testcases`,
      req.body,
      {
        params: {
          access_token: process.env.SPHERE_PROBLEM_TOKEN,
        },
      }
    );

    const testcaseId = result.data.number;
    const testcases = { ...req.body, testcaseId };

    await problems.updateOne({ problemId }, { $push: { testcases } });

    return res
      .status(200)
      .send(`Testcase (${testcaseId}) added to problemId: ${problemId}`);
  } catch (error) {
    if (error.details) {
      return res
        .status(422)
        .json(error.details.map((detail) => detail.message).join(", "));
    }

    return res.status(500).send(error);
  }
};

export const editTestcase = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const testcaseId = req.params.testcaseId;

    //Request Body Validation
    const registerSchema = Joi.object({
      input: Joi.string().required(),
      output: Joi.string().required(),
      timeLimit: Joi.number().required(),
      judgeId: Joi.number().required(),
      active: Joi.boolean().required(),
    });
    await registerSchema.validateAsync(req.body);

    await axios.put(
      `${process.env.SPHERE_ENDPOINT}/problems/${problemId}/testcases/${testcaseId}`,
      req.body,
      {
        params: {
          access_token: process.env.SPHERE_PROBLEM_TOKEN,
        },
      }
    );

    await problems.updateOne(
      { problemId, "testcases.testcaseId": testcaseId },
      { $set: { "testcases.$": {...req.body, problemId} } }
    );

    return res
      .status(200)
      .send(`Testcase (${testcaseId}) of problemId: ${problemId} updated`);
  } catch (error) {
    if (error.details) {
      return res
        .status(422)
        .json(error.details.map((detail) => detail.message).join(", "));
    }

    return res.status(500).send(error);
  }
};
