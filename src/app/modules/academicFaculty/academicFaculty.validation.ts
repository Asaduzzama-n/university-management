import { z } from 'zod';

const createAcademicFacultyZonSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required for faculty!',
    }),
  }),
});

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required for faculty!',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyZonSchema,
  updateAcademicFacultyZodSchema,
};
