import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { StudentService } from './student.services';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from './student.interfaces';
import httpStatus from 'http-status';

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

export const studentController = {
  getSingleStudent,
};
