import * as Studentcontroller from '../controllers/StudentController.js'
import express from 'express'

const studentRoutes = express.Router();

studentRoutes.get('/all', Studentcontroller.fetchStudents);
// bookRoutes.post('/new', Bookcontroller.createBooks);

export default studentRoutes;