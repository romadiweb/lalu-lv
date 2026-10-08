"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DeleteRecordForm } from "./delete-record-form";

type AdminRecordRow = {
  id: string;
  copyText?: string;
  [key: string]: string | undefined;
};

type AdminRecordsTableProps = {
  section: string;
  columns: string[];
  records: AdminRecordRow[];
};

export function AdminRecordsTable({
  section,
  columns,
  records,
}: AdminRecordsTableProps) {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyRecordText = async (record: AdminRecordRow) => {
    if (!record.copyText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(record.copyText);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = record.copyText;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopiedId(record.id);
    window.setTimeout(() => setCopiedId((currentId) => (
      currentId === record.id ? null : currentId
    )), 1600);
  };

  const visibleRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("lv");

    if (!normalizedQuery) {
      return records;
    }

    return records.filter((record) =>
      Object.values(record).some((value) =>
        String(value ?? "").toLocaleLowerCase("lv").includes(normalizedQuery),
      ),
    );
  }, [query, records]);

  return (
    <section className="admin-list-section" aria-label="CMS ierakstu saraksts">
      <div className="admin-list-toolbar">
        <label className="admin-list-search">
          <span>Meklēt pēc nosaukuma vai satura</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Meklēt ierakstos"
          />
        </label>
        <p>
          Parādīti {visibleRecords.length} no {records.length}
        </p>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
              <th>Darbība</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.length ? (
              visibleRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  {columns.map((column) => (
                    <td key={column}>{record[column]}</td>
                  ))}
                  <td className="admin-table-actions">
                    {record.copyText ? (
                      <button
                        className="admin-copy-button"
                        type="button"
                        onClick={() => copyRecordText(record)}
                      >
                        {copiedId === record.id ? "Nokopēts" : "Kopēt"}
                      </button>
                    ) : null}
                    <Link
                      className="admin-edit-button"
                      href={`/admin/${section}/${record.id}/`}
                    >
                      Labot
                    </Link>
                    <DeleteRecordForm
                      section={section}
                      id={record.id}
                      compact
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="admin-empty-row" colSpan={columns.length + 2}>
                  Nekas neatbilst meklēšanai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
