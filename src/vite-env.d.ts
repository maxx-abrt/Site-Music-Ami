/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_SECRET: string;
  readonly VITE_YOUTUBE_API_KEY: string;
  readonly VITE_CHANNEL_ID: string;
  readonly VITE_PUBLIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'web-vitals';
