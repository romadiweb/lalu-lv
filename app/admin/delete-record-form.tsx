"use client";

import { useFormStatus } from "react-dom";
import { deleteRecordAction } from "./actions";

function DeleteButton({ compact }: { compact: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button className="admin-delete-button" type="submit" disabled={pending}>
      {pending ? "Dzēš..." : compact ? "Dzēst" : "Dzēst ierakstu"}
    </button>
  );
}

export function DeleteRecordForm({
  section,
  id,
  compact = false,
}: {
  section: string;
  id: string;
  compact?: boolean;
}) {
  return (
    <form
      className="admin-delete"
      action={deleteRecordAction}
      onSubmit={(event) => {
        if (!window.confirm("Vai tiešām vēlaties dzēst šo ierakstu? Šo darbību nevar atsaukt.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="_section" value={section} />
      <input type="hidden" name="_id" value={id} />
      <DeleteButton compact={compact} />
    </form>
  );
}
