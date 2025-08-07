import type { Course } from '@/types'

const API_BASE = 'http://localhost:4000/api/courses'

export const getCourses = async (): Promise<Course[]> => {
  const res = await fetch(API_BASE)
  if (!res.ok) throw new Error('Failed to fetch courses')
  return res.json()
}

export const createCourse = async (course: Omit<Course, 'id'>): Promise<Course> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  })
  if (!res.ok) throw new Error('Failed to create course')
  return res.json()
}

export const updateCourse = async (course: Course): Promise<Course> => {
  const res = await fetch(`${API_BASE}/${course.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  })
  if (!res.ok) throw new Error('Failed to update course')
  return res.json()
}

export const deleteCourse = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to delete course')
}
