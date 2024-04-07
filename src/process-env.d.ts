declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: number;
      MONGODB_URI: string;
      JWT_SECRET: string
    }
  }
}

export {}