import {
  addBook,
  deleteBook,
  filterBook,
  readAllBook,
  updateBook,
} from "../controllers/book.controllers.js";

import express from "express";

const router = express.Router();

// book route

router.post("/add", addBook);
router.get("/readAll", readAllBook);
router.get("/filter", filterBook);
router.put("/update/:id", updateBook);
router.get("/delete/:id", deleteBook);
export default router;
