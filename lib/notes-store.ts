// lib/notes-store.ts

// Note type object
export type Note = {
    id: string;
    title: string;
    body: string;
    createdAt: string;
};

// Array of notes
let notes: Note[] = [
    {
        id: "1",
        title: "First Note",
        body: "This is the first note.",
        createdAt: new Date().toISOString()
    }
];

/**
 * Generates a random string of 7 characters (base 36).
 * @returns {string} A random string of 7 characters.
 */
function makeId(): string {
    return Math.random().toString(36).substring(2, 9);
}

/**
 * Returns a sorted array of all notes.
 * The array is sorted in descending order of the notes' creation times.
 * @returns {Note[]} A sorted array of all notes.
 */
export function getAllNotes(): Note[] {
    return notes.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/**
 * Returns a note by its id if it exists, or null if it does not.
 * @param {string} id - The id of the note to retrieve.
 * @returns {Note | null} The note if it exists, or null if it does not.
 */
export function getNoteById(id: string): Note | null {
    return notes.find((n) => n.id === id) || null;
}

/**
 * Creates a new note with the given title and body.
 * The note is given a unique id and its creation time is set to the current time.
 * The note is added to the array of all notes.
 * @param {Object} input - The title and body of the note to create.
 * @param {string} input.title - The title of the note to create.
 * @param {string} input.body - The body of the note to create.
 * @returns {Note} The created note.
 */
export function createNote(input: { title: string; body: string }): Note {
    const newNote = {
        id: makeId(),
        title: input.title.trim(),
        body: input.body.trim(),
        createdAt: new Date().toISOString()
    };
    notes.push(newNote);
    return newNote;
}

/**
 * Deletes a note by its id.
 * @param {string} id - The id of the note to delete.
 * @returns {boolean} True if the note was deleted, false if it was not found.
 */
export function deleteNote(id: string): boolean {
    const before = notes.length;
    notes = notes.filter((n) => n.id !== id);
    return notes.length !== before;
}