import { SortOrder } from 'mongoose';
import { Request, Response } from 'express';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.Interfaces';
import { AcademicFaculty } from './academicFaculty.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getSingleAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const getAllAcademicFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
) => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultyFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to full fill all the conditions
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // If there is no condition , put {} to give all data
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
