import axios from "axios";
import problems from "../models/problemModel.js";
import Joi from "joi";
import { sendMail } from "../helpers.js";

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
    res.status(500).json(error.message);
  }
};

export const createSubmission = async (req, res) => {
  try {
    //Request Body Validation
    const problemSchema = Joi.object({
      problemId: Joi.number().required(),
      source: Joi.string().required(),
      compilerId: Joi.number().required(),
      compilerVersionId: Joi.number(),
      tests: Joi.string(),
    });
    await problemSchema.validateAsync(req.body);

    const result = await axios.post(
      `${process.env.SPHERE_ENDPOINT}/submissions`,
      req.body,
      {
        params: {
          access_token: process.env.SPHERE_PROBLEM_TOKEN,
        },
      }
    );

    res.status(200).json(`Submission ID: ${result.data.id}`);
  } catch (error) {
    if (error.details) {
      return res
        .status(422)
        .json(error.details.map((detail) => detail.message).join(", "));
    }
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const checkResult = async (req, res) => {
  try {
    const submissionId = req.params.submissionId;

    const result = await axios.get(
      `${process.env.SPHERE_ENDPOINT}/submissions/${submissionId}`,
      {
        params: {
          access_token: process.env.SPHERE_PROBLEM_TOKEN,
        },
      }
    );

    //Send Email
    const mailOptions = {
      from: "ishtails@gmail.com",
      to: req.user.email,
      subject: `CometLabs - Submission Result`,
      text: `Submission(${submissionId}) Score: ${result.data.result.score} Status: ${result.data.result.status.name}`,
    };

    await sendMail(mailOptions);
    res.status(200).send(result.data.result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
