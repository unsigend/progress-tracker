// import dependencies
import { Router } from "express";

// import controller
import bookController from "@/controller/book.controller";

// import middlewares
import { validateBody, validateParams } from "@/middleware/validateMiddleware";

// import schemas
import { bookObjectSchema, bookIDSchema } from "@/schemas/book.schema";

const router = Router();

router.get("/", bookController.getBooks);
router.get("/:id", validateParams(bookIDSchema), bookController.getBookByID);
router.post("/", validateBody(bookObjectSchema), bookController.createBook);
router.put(
    "/:id",
    validateParams(bookIDSchema),
    validateBody(bookObjectSchema),
    bookController.updateBook
);
router.delete(
    "/:id",
    validateParams(bookIDSchema),
    bookController.deleteBookByID
);

export default router;
