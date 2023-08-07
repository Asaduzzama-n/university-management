import { Request, Response } from 'express';
import { IStudent } from './student.interfaces';
import { Student } from './student.model';

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

export const StudentService = {
  getSingleStudent,
};
