type FileNode = {
name: string;
type: "file";
content: string;
};

type DirectoryNode = {
name: string;
type: "directory";
children: Record<string, FSNode>;
};

export type FSNode = FileNode | DirectoryNode;