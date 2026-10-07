"use client";

import { useEffect, useState } from "react";

export function SaveToast() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="admin-save-toast" role="status" aria-live="polite">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="m4.5 10.5 3.25 3.25L15.5 6" />
      </svg>
      <span>Izmaiņas saglabātas</span>
    </div>
  );
}
