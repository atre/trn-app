/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace Express {
    export interface User {
      id: number;
      nickname: string;
    }
  }
}
// types/express/index.d.ts

declare namespace Express {
  export interface Request {
    user?: {
      userId: number;
      nickname: string;
    }; // You can replace 'any' with a more specific type if needed
  }
}
