import { useEffect, useRef } from "react";

export default function Output({ lines }: { lines: { type: string; text: string; cwd?: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);

  return (
    <div className="term-body" ref={ref}>
      {lines.map((line, i) => (
        <div key={i} className={`term-line term-${line.type}`}>
          {line.type === "cmd" ? (
            <>
              <span className="term-prompt-path">{line.cwd}</span>{" "}
              <span className="term-prompt-symbol">❯</span>{" "}
              {line.text}
            </>
          ) : (
            line.text
          )}
        </div>
      ))}
    </div>
  );
}