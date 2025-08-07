import { PrismaClient } from '@prisma/client'
import type { Request, Response } from 'express'

const prisma = new PrismaClient()

// GET all courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: { videos: true }
    })
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' })
  }
}

// GET course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Course ID is required' });
    }
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: { videos: true }
    })
    if (!req.params.id) {
      return res.status(400).json({ message: 'Course ID is required' });
    }
    if (!course) return res.status(404).json({ error: 'Course not found' })
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course' })
  }
}

// POST new course
export const createCourse = async (req: Request, res: Response) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.endDate) {
      return res.status(400).json({ message: 'Title, description, and end date are required' });
    }
    const { title, description, endDate, videos } = req.body

    const course = await prisma.course.create({
      data: {
        title,
        description,
        endDate: new Date(endDate),
        videos: {
          create: videos || []
        }
      },
      include: { videos: true }
    })

    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course' })
  }
}

// PUT update course + replace videos
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, endDate, videos } = req.body
    if (!req.params.id) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    //When updating the course, we need to remove the courseId from each video to avoid foreign key issues
    const videosWithoutCourseId = (videos || []).map((item: any) => {
      const { courseId, ...video } = item
      return video
    })

    const updated = await prisma.course.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        endDate: new Date(endDate),
        videos: {
          deleteMany: {}, // remove old videos
          create: videosWithoutCourseId || []
        }
      },
      include: { videos: true }
    })

    res.json(updated)
  } catch (err) {
    res.status(404).json({ error: 'Course not found' })
  }
}

// DELETE course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Course ID is required' });
    }
    await prisma.course.delete({
      where: { id: req.params.id }
    })
    res.status(204).send()
  } catch (err) {
    res.status(404).json({ error: 'Course not found' })
  }
}
