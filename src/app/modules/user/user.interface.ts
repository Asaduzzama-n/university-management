import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interfaces';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
};

export type UserModel = Model<IUser>;
