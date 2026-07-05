export enum MCFileType {
    Folder = 0,
    File = 1,
}

export enum MCFileVisibility {
    Private = 0,
    Public = 1,
}

export class MCFile {
    id?: number | string;
    name?: string;
    url?: string;
    size?: number;
    parent_id?: number | string;
    type?: MCFileType;
    visibility?: MCFileVisibility;
    mime_type?: string;
    sort?: number;
    created_at?: string;
}