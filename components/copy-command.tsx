"use client";

import { useState } from "react";

const command = "git clone https://github.com/Stackiln/stackiln.git";

export function CopyCommand() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="quick-command">
      <code>
        <span>$</span> {command}
      </code>
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
