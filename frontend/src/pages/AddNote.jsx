import NoteForm from "../components/NoteForm"

export default function AddNote() {
    return (
        <div className="flex flex-col">
            <h1 className="font-inter font-bold text-2xl text-center mb-10">Add Note</h1>
            <NoteForm />
        </div>
    )
}