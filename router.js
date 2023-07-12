import { registerUser, loginUser } from "./controllers/auth.js";
import {
  addProblem,
  editProblem,
  deleteProblem,
  addTestcase,
  updateTestcase,
} from "./controllers/admin.js";
import {
  getAllProblems,
  createSubmission,
  checkResult,
} from "./controllers/users.js";

import { Router } from "express";
const router = Router();

//AUTH
router.post("/login", loginUser);
router.post("/register", registerUser);

//ADMIN
router.post("/admin/add-problem", addProblem);
router.put("/admin/edit-problem/:id", editProblem);
router.delete("/admin/delete-problem/:id", deleteProblem);
router.post("/admin/add-testcase/:problemId", addTestcase);
router.put("/admin/update-testcase/:problemId/:testcaseId", updateTestcase);

//USER
router.get("/user/all-problems", getAllProblems);
router.post("/user/submit-solution", createSubmission);
router.get("/user/submissions/:id", checkResult);

export default router;
