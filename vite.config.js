import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'frontend.mc-kit-dev.orb.local',
      'localhost',
      '0.0.0.0',
      '.orb.local'
    ],
    host: '0.0.0.0',
    port: 4203
  }
});