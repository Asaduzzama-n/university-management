import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.Interfaces';

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
