import { Document } from 'mongoose';

export class Customers extends Document {
  id: string;

  document: number;

  name: string;
}
