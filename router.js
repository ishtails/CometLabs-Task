import { registerUser, loginUser } from "./controllers/auth.js";
import {
  addProblem,
  editProblem,
  deleteProblem,
  addTestcase,
  editTestcase,
} from "./controllers/admin.js";
import {
  getAllProblems,
  createSubmission,
  checkResult,
} from "./controllers/users.js";
import { Router } from "express";
import { isAuth, isAdmin } from "./middlewares.js";
const router = Router();

//AUTH
router.post("/login", loginUser);
router.post("/register", registerUser);

//ADMIN
router.post("/admin/add-problem", isAuth, isAdmin, addProblem);
router.put("/admin/edit-problem/:problemId", isAuth, isAdmin, editProblem);
router.delete("/admin/delete-problem/:problemId", isAuth, isAdmin, deleteProblem);
router.post("/admin/add-testcase/:problemId", isAuth, isAdmin, addTestcase);
router.put("/admin/edit-testcase/:problemId/:testcaseId", isAuth, isAdmin, editTestcase);

//USER
router.get("/user/all-problems", isAuth, getAllProblems);
router.post("/user/submit-solution", isAuth, createSubmission);
router.get("/user/submissions/:id", isAuth, checkResult);

export default router;