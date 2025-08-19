import { Router } from "express";
import bookController from "@/controller/book.controller";

const router = Router();

router.get("/", bookController.getBook);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;
