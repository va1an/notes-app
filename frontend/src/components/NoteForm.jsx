import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [important, setImportant] = useState(false);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    async function fetchTags() {
        try {
            const { data } = await API.get('/tags');
            setTags(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchNote() {
        try {
            const { data } = await API.get(`/note/${id}`);
            setTitle(data.title);
            setContent(data.content);
            setImportant(data.important);
            setSelectedTags(data.tags.map(t => t._id));
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit() {
        const payload = {
            title,
            content,
            important,
            tags: selectedTags
        }
        try {
            if (id) {
                await API.put(`/update/note/${id}`, payload);
            }
            else {
                await API.post('/note', payload);
            }

            setTitle('');
            setContent('');
            setImportant(false);
            setSelectedTags([]);

            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    }

    function toggleTagSelection(tagId) {
        setSelectedTags(prev => prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId])
    }

    useEffect(() => {
        fetchTags();
        if (id) fetchNote();
    }, [id])

    return (
        <form action={handleSubmit} className="flex flex-col gap-4 lg:items-center">
            <input type="text" placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-3 outline-none rounded-lg lg:w-[50%]" required />
            <textarea placeholder="Note content" value={content} onChange={(e) => setContent(e.target.value)} className="border p-3 outline-none rounded-lg lg:w-[50%]"></textarea>
            <button
                type="button"
                onClick={() => setImportant(!important)}
                className="flex gap-2"
            >
                <Star
                    size={24}
                    className={`${important ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                />
                <span className="font-inter">Mark as Important</span>
            </button>

            <div>
                <p className="font-inter mb-2">Select Tags:</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <button
                            type="button"
                            key={tag._id}
                            onClick={() => toggleTagSelection(tag._id)}
                            className={`px-3 py-1 rounded-lg text-white 
                                    ${selectedTags.includes(tag._id)
                                    ? "bg-blue-600"
                                    : "bg-gray-500"
                                }`}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white font-inter p-3 rounded-lg mt-3 cursor-pointer">
                {id ? "Update Note" : "Add Note"}
            </button>
        </form>
    )
}