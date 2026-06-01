import { FSNode } from "./fs";

export type Session={
    id:string,
    cwd:string,
    history:string[],
    fs:FSNode
}