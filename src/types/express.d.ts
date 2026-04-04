import { User } from '../models/user';
import 'express';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
