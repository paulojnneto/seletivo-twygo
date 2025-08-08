import { useCallback, useState } from 'react'
import { getCourses, createCourse, updateCourse, deleteCourse } from '@/services/courseService'
import type { Course } from '@/types'

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getCourses()
      setCourses(data)
    } catch (err) {
      setError('Failed to fetch courses')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveCourse = async (course: Course) => {
    try {
      const updated =
        course.id ? await updateCourse(course)
          : await createCourse(course)

      setCourses(prev => {
        const exists = prev.some(c => c.id === updated.id)
        return exists
          ? prev.map(c => (c.id === updated.id ? updated : c))
          : [...prev, updated]
      })
    } catch (err) {
      setError('Error saving course')
      console.error(err)
      throw err
    }
  }

  const deleteCourseHandler = async (id: string) => {
    try {
      await deleteCourse(id)
      await fetchCourses()
    } catch (err) {
      setError('Error deleting course')
      console.error(err)
      throw err
    }
  }


  return {
    courses,
    loading,
    error,
    fetchCourses,
    saveCourse,
    deleteCourseHandler
  }
}
