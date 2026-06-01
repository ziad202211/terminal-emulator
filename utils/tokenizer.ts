export type Token =
| { type: "WORD"; value: string }
| { type: "STRING"; value: string };

const tokenize = (input: string): Token[] => {
const tokens: Token[] = [];

let current = "";
let inQuotes = false;

for (let i = 0; i < input.length; i++) {
const char = input[i];

if (char === '"') {
if (inQuotes) {

tokens.push({ type: "STRING", value: current });
current = "";
inQuotes = false;
} else {

if (current.length > 0) {
    tokens.push({ type: "WORD", value: current });
    current = "";
}
inQuotes = true;
}
continue;
}

if (!inQuotes && (char === " " || char === "\t" || char === "\n")) {
if (current.length > 0) {
tokens.push({ type: "WORD", value: current });
current = "";
}
continue;
}
current += char;
}

if (current.length > 0) {
tokens.push({
type: inQuotes ? "STRING" : "WORD",
value: current,
});
}
return tokens;
};

export default tokenize;