"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteRecordAction } from "./actions";

export function RecordFormActions({ canDelete }: { canDelete: boolean }) {
  const { pending } = useFormStatus();
  const [intent, setIntent] = useState<"save" | "delete" | null>(null);

  return (
    <div className="admin-record-actions">
      <button
        className="admin-button"
        type="submit"
        disabled={pending}
        onClick={() => setIntent("save")}
      >
        {pending && intent === "save" ? "Saglabā..." : "Saglabāt"}
      </button>
      {canDelete ? (
        <button
          className="admin-delete-button"
          disabled={pending}
          formAction={deleteRecordAction}
          onClick={(event) => {
            if (!window.confirm("Vai tiešām vēlaties dzēst šo ierakstu? Šo darbību nevar atsaukt.")) {
              event.preventDefault();
              setIntent(null);
              return;
            }

            setIntent("delete");
          }}
          type="submit"
        >
          {pending && intent === "delete" ? "Dzēš..." : "Dzēst ierakstu"}
        </button>
      ) : null}
    </div>
  );
}
