import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import {
  generateFacultyId,
  generateStudentId,
} from './app/modules/user/user.utils';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use('/api/v1/', routes);

app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found!',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found!',
      },
    ],
  });
  next();
});

// Testing

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   res.send('Working Successfully')
//   //     throw new ApiError(400, 'NEW ERROR')
//   //   next('ole baba error!')
//   //   Promise.reject(new Error('Unhandled Promise Rejection'))
//   //   console.log(x)
//   // throw new Error('Testing error logger!')
// });

// const academicSemester = {
//   year: '2025',
//   code: '03',
// };

// const testStudentId = async () => {
//   const result = await generateFacultyId();
//   console.log(result);
// };

// testStudentId();

export default app;
