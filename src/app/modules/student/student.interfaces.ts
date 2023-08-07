import { Model, Types } from 'mongoose';
import { IAcademicSemester } from '../academicSemester/academicSemester.Interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.Interfaces';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';

type studentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
type guardianInfo = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

type localGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: studentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: guardianInfo;
  localGuardian: localGuardian;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  profileImage?: string;
};

export type StudentModel = Model<IStudent>;
