/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAITLIST_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
