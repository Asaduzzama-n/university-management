import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IAcademicDepartment } from './academicDepartment.interfaces';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { paginationConstants } from '../../../constants/paginationConstants';
import { AcademicDepartmentService } from './academicDepartment.services';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department fetched successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationConstants);

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.updateDepartment(id, req.body);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department deleted successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
