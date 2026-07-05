import { InjectionToken } from "@angular/core";

export const GCLOUD_STORAGE_CONFIG = new InjectionToken<MCGCloudStorageConfig>('mc.gcloud.storage');

export class MCGCloudStorageConfig {
    baseUrl?: string;
    bucket?: string;
    is_need_signed_url?: boolean;
}