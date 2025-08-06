// src/views/CoursePageWrapper.tsx
import { useState } from 'react'
import type { Course } from '@/types'
import { CourseFormView } from '@/views/CourseFormView'
import { mockCourses } from '@/data/mockCourses'

export function CoursePageWrapper() {
  const [, setCourses] = useState<Course[]>(mockCourses)

  const handleSave = (newCourse: Course) => {
    setCourses(prev => {
      const exists = prev.some(c => c.id === newCourse.id)
      return exists
        ? prev.map(c => (c.id === newCourse.id ? newCourse : c))
        : [...prev, newCourse]
    })
  }

  return <CourseFormView onSave={handleSave} />
}
