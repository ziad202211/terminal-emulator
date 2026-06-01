    import  {Token} from "../../utils/tokenizer";
    type AST =| {
    type: "COMMAND";
    name: string;
    args: string[];
    };
    const parse = (tokens: Token[]): AST => {
    let current: AST | null = null;

    for (const token of tokens) {
    if (token.type === "WORD") {
        if (!current) {
        current = {
            type: "COMMAND",
            name: token.value,
            args: []
        };
        } else {
        current.args.push(token.value);
        }
    }

    if (token.type === "STRING") {
        if (current) {
        current.args.push(token.value);
        }
    }
    }

    if (!current) {
    throw new Error("Empty command");
    }

    return current;
    };

    export default parse;