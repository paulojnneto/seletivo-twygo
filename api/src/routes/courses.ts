import express from 'express'
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courses.js'
import path from 'path'

const router = express.Router()

router.get('/', getAllCourses)
router.get('/:id', getCourseById)
router.post('/', createCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)
router.use('/videos', express.static(path.join(process.cwd(), 'dist', 'videos')))

export default router