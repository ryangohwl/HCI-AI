/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Declare each environment variable you use
    readonly VITE_BASE_URL: string;
    readonly VITE_OPENAI_KEY: string;
    
    // Include other variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  