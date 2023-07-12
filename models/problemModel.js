import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model.problems ||
  mongoose.model("problem", problemSchema);
