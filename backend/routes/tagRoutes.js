import express from "express";
import { createTag, deleteTag, getTags, updateTag } from "../controllers/tagController.js";

const router = express.Router();

router.get("/tags", getTags);
router.post("/tag", createTag);
router.put("/update/tag/:id", updateTag);
router.delete("/delete/tag/:id", deleteTag);

export default router;