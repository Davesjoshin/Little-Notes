import Link from "next/link";
import { headers } from "next/headers";
import type { Note } from "@/lib/notes-store";

/**
 * Retrieves an array of all notes from the API.
 * If the API request fails, an empty array is returned.
 * @returns {Promise<Note[]>} A promise that resolves to an array of all notes.
 */
async function getNotes(): Promise<Note[]> {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/notes`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = (await res.json()) as { notes: Note[] };
  return data.notes || [];
}

/**
 * The HomePage component.
 * This component renders the homepage of the app.
 * It retrieves an array of all notes from the API, and renders a list of all notes if there are any, or a message indicating that there are no notes yet.
 * The page includes a link to create a new note.
 */
export default async function HomePage() {
  const notes = await getNotes();

  return (
    <main className="mx-auto max-w-2xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Little Notes</h1>
        <p className="text-sm text-neutral-500">
          A tiny CRUD app to relearn the flow.
        </p>
      </header>

      <div className="mb-6">
        <Link
          href="/new"
          className="inline-flex rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
        >
          ➕ New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="text-neutral-600">No notes yet.</p>
      ) : (
        <ul className="grid gap-3">
          {notes.map((note) => {
            const body = note.body || "";

            return (
              <li
                key={note.id}
                className="rounded-lg border border-neutral-200 bg-white p-4"
              >
                <Link
                  href={`/notes/${note.id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {note.title}
                </Link>

                <p className="mt-2 text-neutral-700">
                  {body.length > 140 ? body.slice(0, 140) + "…" : body}
                </p>

                <div className="mt-2 text-xs text-neutral-400">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
