import * as StudentController from '../controllers/StudentController.js';
import express from "express";

const router = express.Router();

studentRoutes.get('/all', StudentController, fetchStudents);

export default studentRoutes;