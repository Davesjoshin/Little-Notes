import { createNote, getAllNotes } from "@/lib/notes-store";
import { revalidatePath } from "next/cache";

/**
 * Retrieves an array of all notes.
 * @returns {Response} A JSON response containing an array of all notes.
 */
export async function GET() {
  return Response.json({ notes: getAllNotes() });
}

/**
 * Creates a new note with the given title and body.
 * The title and body are required, and must not be empty.
 * If the request body is invalid, a 400 Bad Request response is returned.
 * If the note is successfully created, a 201 Created response is returned with the created note.
 * The homepage is also revalidated so that the new note is visible.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { title?: string; body?: string };

    const title = body.title || "";
    const noteBody = body.body || "";

    if (!title.trim() || !noteBody.trim()) {
      return Response.json(
        { error: "Title and body are required." },
        { status: 400 }
      );
    }

    const note = createNote({ title, body: noteBody });

    // Revalidate the homepage
    revalidatePath("/");

    return Response.json({ note }, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }
}
