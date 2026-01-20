"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * The DeleteButton component.
 * This component renders a button to delete a note by its id.
 * The button is disabled while the deletion is in progress.
 * If the deletion fails, an alert is displayed.
 * If the deletion succeeds, the user is redirected to the homepage.
 * @param {Object} props - The props object.
 * @param {string} props.id - The id of the note to delete.
 * @returns {JSX.Element} The rendered button.
 */
export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const ok = confirm("Delete this note?");
    if (!ok) return;

    setDeleting(true);

    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete.");
      setDeleting(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-md border-red-500 border-2 border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-50 disabled:opacity-60"
    >
      {deleting ? "Deleting..." : "🗑 Delete"}
    </button>
  );
}
