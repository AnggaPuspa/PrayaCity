/**
 * Minimal markdown → React for chat bubbles.
 * Supports: paragraphs, **bold**, *italic*, `code`, lists, links, headings.
 * Never injects untrusted markup as HTML — all text is React text nodes.
 */

import { Fragment, type ReactNode } from "react";

/** Inline: bold / italic / code / links. Returns React nodes (safe text). */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Order: code, links, bold, italic
  const pattern =
    /(`[^`]+`)|(\[[^\]]+\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(
        <Fragment key={`${keyPrefix}-t-${i++}`}>
          {text.slice(last, match.index)}
        </Fragment>,
      );
    }

    const [full] = match;
    if (full.startsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${i++}`}
          className="rounded bg-black/10 px-1 py-0.5 font-mono text-[11px]"
        >
          {full.slice(1, -1)}
        </code>,
      );
    } else if (full.startsWith("[")) {
      const m = full.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (m) {
        const href = m[2];
        const safe =
          href.startsWith("/") ||
          href.startsWith("https://") ||
          href.startsWith("http://");
        nodes.push(
          safe ? (
            <a
              key={`${keyPrefix}-a-${i++}`}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-medium underline underline-offset-2 decoration-current/40 hover:decoration-current"
            >
              {m[1]}
            </a>
          ) : (
            <Fragment key={`${keyPrefix}-a-${i++}`}>{m[1]}</Fragment>
          ),
        );
      }
    } else if (full.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-semibold">
          {full.slice(2, -2)}
        </strong>,
      );
    } else if (full.startsWith("*")) {
      nodes.push(
        <em key={`${keyPrefix}-i-${i++}`} className="italic">
          {full.slice(1, -1)}
        </em>,
      );
    }

    last = match.index + full.length;
  }

  if (last < text.length) {
    nodes.push(
      <Fragment key={`${keyPrefix}-t-${i++}`}>{text.slice(last)}</Fragment>,
    );
  }

  return nodes.length > 0 ? nodes : [text];
}

function isBullet(line: string) {
  return /^[-*•]\s+/.test(line);
}

function isOrdered(line: string) {
  return /^\d+[.)]\s+/.test(line);
}

function isHeading(line: string) {
  return /^#{1,3}\s+/.test(line);
}

interface ChatMessageContentProps {
  content: string;
  /** User bubbles use lighter contrast rules. */
  variant?: "user" | "assistant";
}

/**
 * Presentational: formats assistant/user text for the chat modal.
 * Pure UI — no fetch, no state.
 */
export function ChatMessageContent({
  content,
  variant = "assistant",
}: ChatMessageContentProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];

    // blank → spacer
    if (!line.trim()) {
      i += 1;
      continue;
    }

    // heading
    if (isHeading(line)) {
      const text = line.replace(/^#{1,3}\s+/, "");
      blocks.push(
        <p
          key={`h-${blockKey++}`}
          className="mt-1.5 mb-0.5 text-[13px] font-semibold tracking-tight first:mt-0"
        >
          {renderInline(text, `h${blockKey}`)}
        </p>,
      );
      i += 1;
      continue;
    }

    // unordered list
    if (isBullet(line)) {
      const items: string[] = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(/^[-*•]\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul
          key={`ul-${blockKey++}`}
          className="my-1 list-disc space-y-1 pl-4 marker:text-current/50"
        >
          {items.map((item, idx) => (
            <li key={idx} className="pl-0.5">
              {renderInline(item, `ul${blockKey}-${idx}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // ordered list
    if (isOrdered(line)) {
      const items: string[] = [];
      while (i < lines.length && isOrdered(lines[i])) {
        items.push(lines[i].replace(/^\d+[.)]\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ol
          key={`ol-${blockKey++}`}
          className="my-1 list-decimal space-y-1 pl-4 marker:text-current/50"
        >
          {items.map((item, idx) => (
            <li key={idx} className="pl-0.5">
              {renderInline(item, `ol${blockKey}-${idx}`)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // paragraph: gather consecutive non-special lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !isBullet(lines[i]) &&
      !isOrdered(lines[i]) &&
      !isHeading(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push(
      <p key={`p-${blockKey++}`} className="my-0.5 first:mt-0 last:mb-0">
        {renderInline(para.join(" "), `p${blockKey}`)}
      </p>,
    );
  }

  // Fallback if empty parse
  if (blocks.length === 0) {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }

  return (
    <div
      className="space-y-1.5 break-words"
      data-variant={variant}
    >
      {blocks}
    </div>
  );
}
