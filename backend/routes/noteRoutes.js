import express from "express";
import { createNotes, deleteNote, filterByTags, getImportantNotes, getNotes, getSingleNote, searchNotes, updateNotes } from "../controllers/noteController.js";

const router = express.Router();

router.get('/notes', getNotes);
router.post('/note', createNotes);
router.put('/update/note/:id', updateNotes);
router.delete('/delete/note/:id', deleteNote);
router.get('/important-notes', getImportantNotes);
router.get('/note/:id', getSingleNote);
router.get("/notes/search", searchNotes);
router.get("/notes/tag/:tagId", filterByTags);

export default router;