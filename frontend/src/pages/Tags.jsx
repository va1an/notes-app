import TagsTable from "../components/TagsTable";
import API from "../api/axios";
import { useState } from "react";

export default function Tags() {
    const [tagName, setTagName] = useState("");
    const [refresh, setRefresh] = useState(false);

    async function addTag() {
        if (!tagName.trim()) {
            alert("Tag name cannot be empty");
            return;
        }
        try {
            await API.post("/tag", { name: tagName });
            setTagName("");
            setRefresh(prev => !prev);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="font-inter text-xl font-bold mb-10">Tags</h1>
            <div>
                <input value={tagName} onChange={(e) => setTagName(e.target.value)} type="text" placeholder="Enter tag name" className="border outline-none rounded-lg p-3 m-3" />
                <button onClick={addTag} className="font-inter bg-primary hover:bg-primary-light cursor-pointer px-4 py-3 text-white rounded-lg mb-10">Add tag</button>
            </div>
            <TagsTable refresh={refresh} />
        </div>
    )
}