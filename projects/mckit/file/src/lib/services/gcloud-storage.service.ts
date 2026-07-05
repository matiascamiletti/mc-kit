import { MCFileType, MCUploadFileService } from "@mckit/core";
import { map, Observable, switchMap } from "rxjs";
import { MCFile } from "@mckit/core";
import { inject } from "@angular/core";
import { GCLOUD_STORAGE_CONFIG } from "../entities/gcloud-storage-config.entity";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class MCGCloudStorageService extends MCUploadFileService {

    private config = inject(GCLOUD_STORAGE_CONFIG);

    private http = inject(HttpClient);

    upload(file: File): Observable<MCFile> {
        const filename = this.filename(file);
        const mimeType = file.type;

        if(this.config.is_need_signed_url){
            const headers = new HttpHeaders({'Content-Type': mimeType });

            return this.getSignedUrl(filename, mimeType)
            .pipe(
                switchMap((signedUrl: { url?: string, filename?: string }) => this.http.put<any>(signedUrl.url!, file, { headers })),
                map(resp => { 
                    return {
                        name: filename,
                        url: `https://storage.googleapis.com/${this.config.bucket}/${resp.name}`,
                        size: resp.size,
                        type: MCFileType.File,
                        mime_type: mimeType,
                    };
                })
            )
        }
        
        return this.http.post<any>(`https://storage.googleapis.com/upload/storage/v1/b/${this.config.bucket}/o?uploadType=media&name=${filename}`, file)
        .pipe(map(resp => { return {
            name: filename,
            url: `https://storage.googleapis.com/${this.config.bucket}/${filename}`,
            size: resp.size,
            type: MCFileType.File,
            mime_type: mimeType,
        }; }));
    }

    getSignedUrl(filename: string, mimeType?: string): Observable<{ url?: string, filename?: string }> {
        return this.http.post<{ url?: string, filename?: string }>(`${this.config.baseUrl}/signed-urls`, {
            filename,
            mime_type: mimeType
        });
    }
}