"use client";

import { useRef, useState } from "react";

type Command = "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList" | "undo" | "redo" | "createLink" | "foreColor";

const toolbarButtons: Array<{ command: Command; label: string; icon: string }> = [
  { command: "bold", label: "Treknraksts", icon: "B" },
  { command: "italic", label: "Slīpraksts", icon: "I" },
  { command: "underline", label: "Pasvītrojums", icon: "U" },
  { command: "insertUnorderedList", label: "Aizzīmju saraksts", icon: "•" },
  { command: "insertOrderedList", label: "Numurēts saraksts", icon: "1." },
  { command: "undo", label: "Atsaukt", icon: "↶" },
  { command: "redo", label: "Atkārtot", icon: "↷" },
];

export function RichTextEditor({ name, initialHtml }: { name: string; initialHtml: string }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);
  const [serializedValue, setSerializedValue] = useState(() => JSON.stringify(initialHtml ? [initialHtml] : []));

  function syncValue() {
    const html = editorRef.current?.innerHTML.trim() ?? "";
    setSerializedValue(JSON.stringify(html && html !== "<br>" ? [html] : []));
  }

  function rememberSelection() {
    const selection = window.getSelection();
    if (selection?.rangeCount && editorRef.current?.contains(selection.anchorNode)) {
      selectionRef.current = selection.getRangeAt(0).cloneRange();
    }
  }

  function restoreSelection() {
    if (!selectionRef.current) return;
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(selectionRef.current);
  }

  function runCommand(command: Command, value?: string) {
    editorRef.current?.focus();
    restoreSelection();
    if (command === "foreColor") {
      document.execCommand("styleWithCSS", false, "true");
    }
    document.execCommand(command, false, value);
    rememberSelection();
    syncValue();
  }

  function addLink() {
    rememberSelection();
    const url = window.prompt("Ievadiet saites adresi (piemēram, https://lalu.lv):");
    if (!url) return;
    runCommand("createLink", url);
  }

  return (
    <div className="admin-rich-text">
      <div className="admin-rich-toolbar" role="toolbar" aria-label="Teksta formatēšana">
        {toolbarButtons.map((button) => (
          <button
            aria-label={button.label}
            className={`admin-rich-tool admin-rich-tool-${button.command}`}
            key={button.command}
            onClick={() => runCommand(button.command)}
            onMouseDown={(event) => event.preventDefault()}
            title={button.label}
            type="button"
          >
            {button.icon}
          </button>
        ))}
        <button
          aria-label="Pievienot saiti"
          className="admin-rich-tool admin-rich-link"
          onClick={addLink}
          onMouseDown={(event) => event.preventDefault()}
          title="Pievienot saiti"
          type="button"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 12 6.5 13.5a3 3 0 0 1-4.2-4.2L5 6.5a3 3 0 0 1 4.2 0M12 8l1.5-1.5a3 3 0 0 1 4.2 4.2L15 13.5a3 3 0 0 1-4.2 0M7 10h6" /></svg>
        </button>
        <label className="admin-rich-color" title="Teksta krāsa">
          <span>A</span>
          <input
            aria-label="Teksta krāsa"
            defaultValue="#171717"
            onChange={(event) => runCommand("foreColor", event.currentTarget.value)}
            onPointerDown={rememberSelection}
            type="color"
          />
        </label>
      </div>
      <div
        aria-label="Raksta teksts"
        className="admin-rich-editor"
        contentEditable
        dangerouslySetInnerHTML={{ __html: initialHtml }}
        onBlur={syncValue}
        onInput={syncValue}
        onKeyUp={rememberSelection}
        onMouseUp={rememberSelection}
        role="textbox"
        suppressContentEditableWarning
      />
      <textarea name={name} readOnly value={serializedValue} hidden />
    </div>
  );
}
