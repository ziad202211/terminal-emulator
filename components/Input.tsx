"use client";
import { useState, useRef, useEffect } from "react";

export default function Input({ cwd, onEnter }: { cwd: string; onEnter: (v: string) => void }) {
const [value, setValue] = useState("");
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => { inputRef.current?.focus(); }, [cwd]);

function handleKeyDown(e: React.KeyboardEvent) {
if (e.key === "Enter") {
    onEnter(value);
    setValue("");
}
}

return (
<div className="term-input-row">
    <span className="term-input-prompt">
    <span className="term-prompt-path">{cwd}</span>{" "}
    <span className="term-prompt-symbol">❯</span>
    </span>
    <input
    ref={inputRef}
    className="term-input"
    value={value}
    onChange={e => setValue(e.target.value)}
    onKeyDown={handleKeyDown}
    spellCheck={false}
    autoComplete="off"
    />
</div>
);
}