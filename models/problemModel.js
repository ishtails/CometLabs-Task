import mongoose from "mongoose";

const testcaseSchema = new mongoose.Schema({
  testcaseId: {
    type: Number,
    required: [true, "Provide testcase ID"],
  },

  input: {
    type: String,
  },

  output: {
    type: String,
  },

  timeLimit: {
    type: Number,
  },

  judgeId: {
    type: Number,
    required: [true, "Provide Judge ID"],
  },
  
  active: {
    type: Boolean,
  },
});

const problemSchema = new mongoose.Schema(
  {
    problemId: {
      type: Number,
      required: [true, "Provide Problem ID"],
      unique: [true, "Email already exists"],
    },

    name: {
      type: String,
      required: [true, "Provide Problem Name"],
    },

    masterjudgeId: {
      type: String,
      required: [true, "Provide masterjudgeId"],
    },

    body: {
      type: String,
    },

    typeId: {
      type: String,
    },

    interactive: {
      type: Boolean,
    },

    testcases: [testcaseSchema],
  },
  { timestamps: true }
);

export default mongoose.model.problems ||
  mongoose.model("problem", problemSchema);
