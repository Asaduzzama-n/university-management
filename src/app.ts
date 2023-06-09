import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import routes from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use('/api/v1/', routes);

// Testing

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   res.send('Working Successfully')
//   //     throw new ApiError(400, 'NEW ERROR')
//   //   next('ole baba error!')
//   //   Promise.reject(new Error('Unhandled Promise Rejection'))
//   //   console.log(x)
//   // throw new Error('Testing error logger!')
// });

app.use(globalErrorHandler);

export default app;
