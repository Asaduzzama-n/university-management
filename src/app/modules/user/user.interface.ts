import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interfaces';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
  needPasswordChange: true | false;
  passwordChangedAt: Date;
};

export interface IUserMethods {
  isUserExists(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'role' | 'password' | 'needPasswordChange'
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;
