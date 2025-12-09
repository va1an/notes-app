import { useState, useEffect } from "react";
import API from "../api/axios";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Important() {
    const [importantNotes, setImportantNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    async function fetchImportantNotes() {
        try {
            const { data } = await API.get("/important-notes");
            setImportantNotes(data || []);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    async function toggleImportant(id, currentState) {
        try {
            await API.put(`/update/note/${id}`, { important: !currentState });

            fetchImportantNotes();
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchImportantNotes();
    }, [])

    if (loading) return <p className="font-inter text-center">Loading...</p>

    return (
        <div className="flex flex-col">
            <h1 className="font-inter text-2xl font-bold text-center mb-10">Important Notes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {importantNotes.length === 0 ? (<p className="font-inter text-center">No notes found...</p>) : (
                    importantNotes.map((note) => (
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
        </div>
    )
}