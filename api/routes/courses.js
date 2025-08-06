import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { courses } from '../data/courses.js'

const router = express.Router()

// GET all courses
router.get('/', (req, res) => {
  res.json(courses)
})

// GET by ID
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id)
  course ? res.json(course) : res.status(404).json({ error: 'Course not found' })
})

// POST create new course
router.post('/', (req, res) => {
  const newCourse = { id: uuidv4(), ...req.body }
  courses.push(newCourse)
  res.status(201).json(newCourse)
})

// PUT update course
router.put('/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Course not found' })

  courses[index] = { ...courses[index], ...req.body }
  res.json(courses[index])
})

// DELETE course
router.delete('/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Course not found' })

  courses.splice(index, 1)
  res.status(204).send()
})

export default router
