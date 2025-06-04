interface ImportMetaEnv {
  readonly VITE_AI_API_URL: string;
  readonly VITE_AI_MODEL: string;
  readonly VITE_REALM: string;
  readonly VITE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
