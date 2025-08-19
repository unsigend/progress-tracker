import { Router } from "express";
import userController from "@/controller/user.controller";

const router = Router();

router.get("/", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
