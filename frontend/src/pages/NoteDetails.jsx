import { useState, useEffect } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function ViewNote() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null);

    const navigate = useNavigate();

    async function fetchNote() {
        try {
            const { data } = await API.get(`/note/${id}`);
            setNote(data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    async function deleteNote() {
        try {
            await API.delete(`/delete/note/${selectedNoteId}`);
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNote();
    }, [])

    if (loading) return <p className="font-inter text-center">Loading...</p>

    if (!note) return <p className="font-inter text-center">No note found</p>

    return (
        <div className="flex flex-col">
            <h1 className="font-bold font-inter text-center text-2xl mb-10">{note.title}</h1>
            <p className="font-iter">{note.content}</p>
            <div className="flex justify-center gap-4 mt-10">
                <button onClick={() => navigate(`/edit-note/${note._id}`)} className="font-inter bg-primary hover:bg-primary-light cursor-pointer px-4 py-2 rounded-lg text-white">Edit</button>
                <button onClick={() => { setSelectedNoteId(note._id); setOpenModal(true) }} className="font-inter bg-red-500 hover:bg-red-400 cursor-pointer px-4 py-2 rounded-lg text-white">Delete</button>
            </div>

            <ConfirmDeleteModal open={openModal} onClose={() => setOpenModal(false)} onConfirm={deleteNote} />
        </div >
    )
}