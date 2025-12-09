import API from "../api/axios";
import { useState, useEffect } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function TagsTable({ refresh }) {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTagId, setSelectedTagId] = useState(null);

    async function fetchTags() {
        try {
            const { data } = await API.get('/tags');
            setTags(data || []);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    async function deleteTag() {
        try {
            await API.delete(`/delete/tag/${selectedTagId}`);
            setTags(prev =>
                prev.filter(tag => String(tag._id) !== String(selectedTagId))
            );
            setSelectedTagId(null);
            setOpenModal(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTags();
    }, [refresh])

    if (loading) return <p className="font-inter text-center">Loading...</p>

    return (
        <div className="flex flex-col">
            <h2 className="font-inter text-xl font-bold mb-5">Available Tags</h2>

            <table className="font-inter min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Tags</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                        <tr key={tag._id} className="border">
                            <td className="border px-4 py-2 text-center font-inter">{tag.name}</td>
                            <td className="border px-4 py-2 text-center"><button onClick={() => { setSelectedTagId(tag._id); setOpenModal(true); }} className="font-inter text-white px-4 py-2 bg-red-500 hover:bg-red-400 cursor-pointer rounded-lg">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmDeleteModal open={openModal} onClose={() => setOpenModal(false)} onConfirm={deleteTag} />
        </div>
    )
}