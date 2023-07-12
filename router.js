import { registerUser, loginUser } from "./controllers/auth.js";

import { Router } from "express";
const router = Router();

//AUTH
router.post("/login", loginUser);
router.post("/register", registerUser);

//ADMIN
// router.post("/admin/addQ", addQuestion);
// router.patch("/admin/editQ/:id", editQuestion);
// router.delete("/admin/deleteQ/:id", deleteQuestion);

// router.post("/admin/addT", addTestcase);
// router.patch("/admin/editT/:id", editTestcase);
// router.delete("/admin/deleteT/:id", deleteTestcase);

//USER
// router.post("/user/check-answer/:id", checkSolution);

export default router;