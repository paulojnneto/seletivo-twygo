import { useEffect, useState } from 'react'
import { Button, Heading, VStack } from '@chakra-ui/react'
import type { Course } from '@/types'
import { getCourses, createCourse, updateCourse } from '@/services/courseService'
import { CourseListView } from './CourseListView'
import { CourseFormView } from './CourseFormView'

export function CourseDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch(err => console.error(err))
  }, [])


  const handleSave = async (course: Course | Omit<Course, 'id'>) => {
    try {
      const updated =
        'id' in course
          ? await updateCourse(course as Course)
          : await createCourse(course as Omit<Course, 'id'>)

      setCourses(prev => {
        const exists = prev.some(c => c.id === updated.id)
        return exists
          ? prev.map(c => (c.id === updated.id ? updated : c))
          : [...prev, updated]
      })

      setShowForm(false)
      setEditingCourse(null)
    } catch (err) {
      console.error('Error saving course:', err)
    }
  }



  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingCourse(null)
    setShowForm(true)
  }

  return (
    <VStack align="stretch" p={4}>
      <Heading size="lg">Courses Dashboard</Heading>

      {!showForm && (
        <Button colorPalette="teal" onClick={handleCreate}>
          + New Course
        </Button>
      )}

      {showForm ? (
        <CourseFormView onSave={handleSave} initialData={editingCourse || undefined} />
      ) : (
        <CourseListView courses={courses} onEdit={handleEdit} />
      )}
    </VStack>
  )
}
