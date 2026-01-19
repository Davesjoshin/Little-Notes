import { deleteNote, getNoteById } from "@/lib/notes-store";

/**
 * Retrieves a note by its id.
 * If the note is not found, a 404 response is returned with an error message.
 * @param {Request} request - The request object.
 * @param {{ params: Promise<{ id: string }> }} context - The context object.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const note = getNoteById(id);

  if (!note) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ note });
}

/**
 * Deletes a note by its id.
 * If the note is not found, a 404 response is returned with an error message.
 * @param {Request} request - The request object.
 * @param {{ params: Promise<{ id: string }> }} context - The context object.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!deleteNote(id)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ ok: true });
}
