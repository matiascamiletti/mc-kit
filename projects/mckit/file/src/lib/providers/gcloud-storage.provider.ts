import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { GCLOUD_STORAGE_CONFIG, MCGCloudStorageConfig } from "../entities/gcloud-storage-config.entity";

export function provideGcloudStorage(value: MCGCloudStorageConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: GCLOUD_STORAGE_CONFIG, useValue: value }]);
}
