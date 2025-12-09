import Tag from "../models/tagModel.js";

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;

        const tagExists = await Tag.findOne({ name });
        if (tagExists) {
            return res.status(400).json({ message: "Tag already exists" });
        }

        const tag = new Tag({ name });
        await tag.save();
        res.status(201).json({ message: "Tag created successfully" });

    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateTag = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const existingTag = await Tag.findOne({ name });
        if (existingTag) {
            return res.status(400).json({ message: "Tag name already exists" });
        }

        const tag = await Tag.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )

        res.status(200).json({ message: "Tag updated successfully" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteTag = async (req, res) => {
    try {
        await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tag deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}