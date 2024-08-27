import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { MC_AUTH_CONFIG, MCAuthConfig } from "../entities/mc-auth-config";

export function provideMCAuth(value: MCAuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: MC_AUTH_CONFIG, useValue: value }]);
}
