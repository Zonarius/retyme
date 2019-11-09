import {Express} from "express-serve-static-core"
import { UserResponse } from '../users';

declare module 'express-serve-static-core' {
  interface Request {
    mesh: {
      version: string;
      requestUser: UserResponse;    
    }
  }
}