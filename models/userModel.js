import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
    },

    email: {
      type: String,
      required: [true, "Provide Email"],
      unique: [true, "Email already exists"],
    },

    password: {
      type: String,
      required: [true, "Provide password"],
    },

    role: {
      type: String,
      required: [true, "Provide role"],
    },
  },
  { timestamps: true }
);

export default mongoose.model.users || mongoose.model("user", userSchema);
