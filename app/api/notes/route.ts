import { createNote, getAllNotes } from "@/lib/notes-store";
import { revalidatePath } from "next/cache";

/**
 * Retrieves an array of all notes from the API.
 * @returns {Promise<Response>} A promise that resolves to a Response object containing an array of all notes.
 */
export async function GET() {
  const notes = await getAllNotes();
  return Response.json({ notes });
}

/**
 * Creates a new note.
 * The request body must contain a JSON object with `title` and `body` properties.
 * If the request body is invalid, a 400 response is returned with an error message.
 * If the note is successfully created, a 201 response is returned with the created note.
 */
export async function POST(request: Request) {
  try {
  
    const body = (await request.json()) as { title?: string; body?: string };

    const title = typeof body.title === "string" ? body.title : "";
    const noteBody = typeof body.body === "string" ? body.body : "";

    if (!title.trim() || !noteBody.trim()) {
      return Response.json(
        { error: "Title and body are required." },
        { status: 400 }
      );
    }

    const note = await createNote({ title, body: noteBody });

    revalidatePath("/");
    return Response.json({ note }, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }
} 
