import { useState } from 'react'
import { Button, Heading, VStack } from '@chakra-ui/react'
import type { Course } from '@/types'
import { mockCourses } from '@/data/mockCourses'
import { CourseListView } from './CourseListView'
import { CourseFormView } from './CourseFormView'

export function CourseDashboard() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSave = (newCourse: Course) => {
    setCourses(prev => {
      const exists = prev.some(c => c.id === newCourse.id)
      const updated = exists
        ? prev.map(c => (c.id === newCourse.id ? newCourse : c))
        : [...prev, newCourse]

      return updated
    })
    setEditingCourse(null)
    setShowForm(false)
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
