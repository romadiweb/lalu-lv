"use client";

import { deleteRecordAction } from "./actions";

export function RecordFormActions({ canDelete }: { canDelete: boolean }) {
  return (
    <div className="admin-record-actions">
      <button className="admin-button" type="submit">
        Saglabāt
      </button>
      {canDelete ? (
        <button
          className="admin-delete-button"
          formAction={deleteRecordAction}
          onClick={(event) => {
            if (!window.confirm("Vai tiešām vēlaties dzēst šo ierakstu? Šo darbību nevar atsaukt.")) {
              event.preventDefault();
            }
          }}
          type="submit"
        >
          Dzēst ierakstu
        </button>
      ) : null}
    </div>
  );
}
