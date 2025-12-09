import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Key, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dropdown from "../components/Dropdown";
import API from "../api/axios";
import { Star } from "lucide-react";

export default function Dasboard() {
    const [query, setQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    async function fetchTags() {
        try {
            const { data } = await API.get("/tags");
            setTags(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchNotes() {
        try {
            const { data } = await API.get("/notes");
            setNotes(data || []);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    async function toggleImportant(id, currentState) {
        try {
            await API.put(`/update/note/${id}`, { important: !currentState });

            setNotes(prev => prev.map(n => n._id === id ? { ...n, important: !currentState } : n));
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleSearch(e) {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            fetchNotes();
            return;
        }

        const { data } = await API.get(`/notes/search?q=${value}`);
        setNotes(data);
    }

    async function handleTagFilter(selected) {
        if (selected.value === "all") {
            fetchNotes();
            return;
        }

        const selectedTag = tags.find(t => t.name === selected.value);

        if (!selectedTag) return;

        const { data } = await API.get(`/notes/tag/${selectedTag._id}`);
        setNotes(data);
    }

    useEffect(() => {
        fetchNotes();
        fetchTags();
    }, [])

    const options = [
        { value: "all", label: "All notes" },
        ...tags.map(tag => ({
            value: tag.name,
            label: tag.name
        }))
    ];

    if (loading) return <p className="font-inter text-center">Loading...</p>

    return (
        <>
            <h1 className="font-inter font-bold text-2xl text-center">Your Notes</h1>
            <div className="flex flex-col md:flex-row md:justify-around mt-10">
                <div className="relative">
                    <Search className="absolute right-3 top-3 text-gray-500" size={18} />
                    <input type="text" placeholder="Search notes..." className="border rounded-lg p-2 outline-none w-full md:w-xl" value={query} onChange={handleSearch} />
                </div>
                <Dropdown options={options} onChange={handleTagFilter} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 gap-3">
                {notes.length === 0 ? (
                    <p>No notes found.</p>
                ) : (
                    notes.map((note) => (
                        <div key={note._id} onClick={() => navigate(`/note-details/${note._id}`)} className="border rounded-lg p-3 cursor-pointer relative">
                            <button onClick={(e) => { e.stopPropagation(); toggleImportant(note._id, note.important) }} className="absolute top-3 right-3"><Star size={22} className={`${note.important ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} /></button>
                            <h2 className="font-inter text-2xl font-semibold">{note.title}</h2>
                            <p className="font-inter mt-1 line-clamp-2">{note.content}</p>
                            <div className="mt-3">
                                {note.tags.map((tag) => (
                                    <span className="mr-2 bg-gray-500 px-3 py-1 rounded-lg text-white" key={tag._id}>
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}