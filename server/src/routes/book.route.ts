// import dependencies
import { Router } from "express";

// import controller
import bookController from "@/controller/book.controller";

const router = Router();

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookByID);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBookByID);

export default router;
