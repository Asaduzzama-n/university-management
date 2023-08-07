import express from 'express';
import { studentController } from './student.controller';
const router = express.Router();

router.get('/:id', studentController.getSingleStudent);

export const StudentRoute = router;
