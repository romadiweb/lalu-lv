"use client";

import { useFormStatus } from "react-dom";

export function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="admin-login-submit" type="submit" disabled={pending}>
      <span>{pending ? "Pārbaudām piekļuvi..." : "Ienākt vadības sistēmā"}</span>

      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M4 10h11" />
        <path d="m11 6 4 4-4 4" />
      </svg>
    </button>
  );
}
