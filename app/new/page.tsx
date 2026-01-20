import Link from "next/link";
import NewNoteForm from "./NewNoteForm";

/**
 * The NewNotePage component.
 * This component renders a page for creating a new note.
 * The page includes a link back to the home page, a heading, and a form to input the title and body of the note.
 */
export default function NewNotePage() {
    return (
        <main className="mx-auto max-w-2xl p-6">
            <div className="mb-4">
                <Link href="/" className="text-sm underline"></Link>
            </div>

            <h1 className="mb-4 text-2xl font-bold">New Note</h1>

            <NewNoteForm />
        </main>
    );
}