import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];
moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

// router.use('/users/', UserRoutes);
// router.use('/academic-semesters/', AcademicSemesterRoutes);

export default router;
