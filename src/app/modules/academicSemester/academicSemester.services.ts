import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterService = {
  createAcademicSemester,
};
