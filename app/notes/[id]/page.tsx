import Link from "next/link";
import { headers } from "next/headers";
import type { Note } from "@/lib/notes-store";
import DeleteButton from "./DeleteButton";

/**
 * Retrieves a note by its id.
 * If the API request fails, null is returned.
 * @param {string} id - The id of the note to retrieve.
 * @returns {Promise<Note | null>} A promise that resolves to the note if it exists, or null if it does not.
 */
async function getNote(id: string): Promise<Note | null> {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/notes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { note: Note };
  return data.note || null;
}

/**
 * The NotePage component.
 * This component renders a page for a single note by its id.
 * It retrieves the note from the API, and renders a page with the note's title, body, and a back button.
 * If the note is not found, it renders a page with a "Note not found" heading and a back button.
 */
export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Next dynamic params are async in your version

  const note = await getNote(id);

  if (!note) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold">Note not found</h1>
        <Link href="/" className="mt-4 inline-block underline">
          ← Back
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="text-sm underline">
          ← Back
        </Link>

        <DeleteButton id={note.id} />
      </div>

      <h1 className="text-3xl font-bold">{note.title}</h1>

      <div className="mt-2 text-xs text-neutral-400">
        {new Date(note.createdAt).toLocaleString()}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-white text-neutral-800">{note.body}</p>
    </main>
  );
}
