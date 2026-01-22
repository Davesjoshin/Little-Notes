import { prisma } from "@/lib/prisma";

export type Note = {
    id: string;
    title: string;
    body: string;
    createdAt: string;
}

export async function getAllNotes(): Promise<Note[]> {
    const notes = await prisma.note.findMany({
        orderBy: { createdAt: "desc" },
    });

    // Convert the notes to the Note type
    return notes.map((n) => ({
        id: n.id,
        title: n.title,
        body: n.body,
        createdAt: n.createdAt.toISOString(),
    }));
}

export async function getNoteById(id: string): Promise<Note | null> {
    // Find the note by its id
    const note = await prisma.note.findUnique({
        where: { id },
    });

    if (!note) return null;

    return {
        id: note.id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt.toISOString(),
    };
}

export async function createNote(input: {
    title: string;
    body: string;
}): Promise<Note> {
    const note = await prisma.note.create({
        data: {
            title: input.title.trim(),
            body: input.body.trim(),
        },
    });

    return {
        id: note.id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt.toISOString(),
    };
}

export async function deleteNote(id: string): Promise<boolean> {
    try {
        await prisma.note.delete({
            where: { id },
        });
        return true;
    } catch (err) {
        return false;
    }
}
