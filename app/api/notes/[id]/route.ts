import { deleteNote, getNoteById } from "@/lib/notes-store";
import { revalidatePath } from "next/cache";

/**
 * Retrieves a single note by its id.
 * If the note is not found, a 404 response is returned with an error message.
 * @param {Request} request - The request object.
 * @param {Object} context - The context object containing the params object.
 * @param {Promise<{id: string}>} context.params - The params object containing the id of the note to retrieve.
 * @returns {Promise<Response>} A promise that resolves to a Response object containing the retrieved note.
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const note = await getNoteById(id);

  if (!note) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ note });
}

/**
 * Deletes a note by its id.
 * @param {Request} request - The request object.
 * @param {Object} context - The context object containing the params.
 * @returns {Promise<Response>} A promise that resolves to a Response object containing a JSON object with an ok property set to true if the note was deleted successfully, or an error message if the note was not found.
 */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const ok = await deleteNote(id);

  if (!ok) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ ok: true });
}
