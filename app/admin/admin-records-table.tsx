"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { DeleteRecordForm } from "./delete-record-form";

type AdminRecordRow = {
  id: string;
  copyText?: string;
  imageUrl?: string;
  categoryIds?: string[];
  [key: string]: string | string[] | undefined;
};

type AdminRecordsTableProps = {
  section: string;
  columns: string[];
  records: AdminRecordRow[];
  categories?: { id: string; name: string; parent_id: string | null }[];
};

export function AdminRecordsTable({
  section,
  columns,
  records,
  categories = [],
}: AdminRecordsTableProps) {
  const isProducts = section === "veikala-produkti";
  const [categoryId, setCategoryId] = useState("");
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

    const categoryIds = new Set([categoryId]);
    // Include every descendant when filtering a parent category.
    let previousSize = 0;
    while (categoryIds.size !== previousSize) {
      previousSize = categoryIds.size;
      for (const category of categories) {
        if (category.parent_id && categoryIds.has(category.parent_id)) categoryIds.add(category.id);
      }
    }
    return records.filter((record) => {
      const matchesCategory = !isProducts || !categoryId || (categoryId === "uncategorized"
        ? !record.categoryIds?.length
        : record.categoryIds?.some((id) => categoryIds.has(id)));
      const matchesSearch = !normalizedQuery || [record.id, ...columns.map((column) => record[column]), record.copyText]
        .some((value) => String(value ?? "").toLocaleLowerCase("lv").includes(normalizedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [query, records, categoryId, categories, columns, isProducts]);

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
        {isProducts ? (
          <label className="admin-category-filter">
            <span>Kategorija</span>
            <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
              <option value="">Visas kategorijas</option>
              <option value="uncategorized">Bez kategorijas</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.parent_id ? `${categories.find((parent) => parent.id === category.parent_id)?.name ?? ""} / ` : ""}{category.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <p aria-live="polite">
          Parādīti {visibleRecords.length} no {records.length}
        </p>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th className={isProducts ? "admin-thumbnail-cell" : undefined}>{isProducts ? "Attēls" : "ID"}</th>
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
                  <td className={isProducts ? "admin-thumbnail-cell" : undefined}>
                    {isProducts ? (
                      <Link className="admin-product-thumbnail" href={`/admin/${section}/${record.id}/`} aria-label={`Labot produktu: ${record.name}`}>
                        {record.imageUrl ? <Image src={record.imageUrl} alt="" width={56} height={56} sizes="56px" /> : <span className="admin-thumbnail-fallback">Nav attēla</span>}
                      </Link>
                    ) : record.id}
                  </td>
                  {columns.map((column) => (
                    <td key={column}>{record[column]}</td>
                  ))}
                  <td className="admin-table-actions">
                    <div className="admin-table-action-buttons">
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="admin-empty-row" colSpan={columns.length + 2}>
                  Nekas neatbilst izvēlētajiem filtriem.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
