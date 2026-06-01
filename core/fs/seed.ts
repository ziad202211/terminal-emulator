import type { FSNode } from "../../types/fs";
export const rootFs: FSNode = {
type: "directory",
name: "/",
children: {
home: {
    type: "directory",
    name: "home",
    children: {
    notes: {
        type: "directory",
        name: "notes",
        children: {
        "note1.txt": {
            type: "file",
            name: "note1.txt",
            content: "This is note 1"
        },
        "note2.txt": {
            type: "file",
            name: "note2.txt",
            content: "This is note 2"
        }
        }
    },
    user: {
        type: "directory",
        name: "user",
        children: {
        "file1.txt": {
            type: "file",
            name: "file1.txt",
            content: "This is file 1"
        },
        "file2.txt": {
            type: "file",
            name: "file2.txt",
            content: "This is file 2"
        }
        }
    }
    }
}
}
};