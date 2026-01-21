"use client"; // nextjs directive, enables client-side rendering

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * The NewNoteForm component.
 * This component renders a form to create a new note.
 * The form includes input fields for the title and body of the note, and a submit button to save the note.
 * If the title or body is empty, an error is displayed.
 * If the save request fails, an error is displayed.
 * Once the note is saved, the user is redirected to the homepage.
 */
export default function NewNoteForm() {
    const router = useRouter();
    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    /**
     * Handles the submission of the new note form.
     * Prevents the default form submission behavior, clears any error messages, and checks if the title and body are not empty.
     */
    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !body.trim()) {
        setError("Please enter a title and body.");
        return;
    }

    setSaving(true);

    const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
    });

    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    console.log("POST /api/notes response:", res.status, data);

    if (!res.ok) {
        setError((data && data.error) || "Failed to save note.");
        setSaving(false);
        return;
    }

    router.push("/");
    router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-3">
            <input
                type="text"
                className="rounded-md border border-neutral-300 px-3 py-2"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="min-h-[140px] rounded-md border border-neutral-300 px-3 py-2"
                placeholder="Body..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={saving}
                className="rounded-md border border-green-500 bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
            >
                {saving ? "Saving..." : "Save Note"}
            </button>
        </form>    
    );
}

