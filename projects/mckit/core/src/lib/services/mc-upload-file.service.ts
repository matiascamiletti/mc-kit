import { Observable } from "rxjs";
import { MCFile } from "../entities/mc-file";

export abstract class MCUploadFileService {

    abstract upload(file: File): Observable<MCFile>;

    filename(file: File): string {
        return file.name;
    }
}