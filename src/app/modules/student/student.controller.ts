import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { StudentService } from './student.services';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from './student.interfaces';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constants';
import { paginationConstants } from '../../../constants/paginationConstants';

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successful!',
    data: result,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationConstants);

  const result = await StudentService.getAllStudent(filters, paginationOptions);

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successful!',
    meta: result.meta,
    data: result.data,
  });
});

export const studentController = {
  getSingleStudent,
  getAllStudent,
};
