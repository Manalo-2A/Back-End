import * as Bookcontroller from '../controllers/BookController.js'
import express from 'express'

const bookRoutes = express.Router();

bookRoutes.get('/all', Bookcontroller.fetchBooks);
// bookRoutes.post('/new', Bookcontroller.createBooks);

export default bookRoutes;