import {
  addBook,
  deleteBook,
  filterBook,
  readAllBook,
  updateBook,
} from "../controllers/book.controllers.js";

import authenticateToken from "../middlewares/authenticateToken.js";
import express from "express";

const router = express.Router();

// book route

router.post("/add", addBook);
router.get("/readAll", authenticateToken, readAllBook);
router.get("/filter", authenticateToken, filterBook);
router.put("/update/:id", authenticateToken, updateBook);
router.get("/delete/:id", authenticateToken, deleteBook);
export default router;
