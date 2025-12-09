import Note from "../models/noteModel.js";

export const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user }).populate("tags", "name");
    res.status(200).json(notes)
}

export const createNotes = async (req, res) => {
    const note = await Note.create({
        user: req.user,
        title: req.body.title,
        content: req.body.content,
        important: req.body.important || false,
        tags: req.body.tags
    });

    res.status(201).json(note);
}

export const updateNotes = async (req, res) => {
    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user },
        req.body,
        { new: true }
    )

    res.status(200).json(note);
}

export const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete({ _id: req.params.id, user: req.user });
    res.status(200).json({ message: "Note deleted successfully" });
}

export const getImportantNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user, important: true }).populate("tags");
    res.status(200).json(notes);
}

export const getSingleNote = async (req, res) => {
    const note = await Note.findById(req.params.id).populate('tags');
    if (!note) {
        res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
}

export const searchNotes = async (req, res) => {
    try {
        const { q } = req.query;
        const notes = await Note.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { content: { $regex: q, $options: "i" } }
            ],
            user: req.user
        }).populate("tags")

        res.json(notes)
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const filterByTags = async (req, res) => {
    try {
        const { tagId } = req.params;

        const notes = await Note.find({
            tags: tagId,
            user: req.user
        }).populate("tags");

        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}