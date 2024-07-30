import { InjectionToken } from "@angular/core";

export const MC_AUTH_CONFIG = new InjectionToken<MCAuthConfig>('mc.auth');

export class MCAuthConfig {
  baseUrl: string = '';
}
