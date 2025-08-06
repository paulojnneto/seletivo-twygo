import { VStack, Heading, Text, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { mockCourses } from '@/data/mockCourses'
import type { Course } from '@/types'

export function CourseListView() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const now = new Date()
    const filtered = mockCourses.filter(
      course => new Date(course.endDate) > now
    )
    setCourses(filtered)
  }, [])

  return (
    <VStack align="stretch" p={4}>
      <Heading size="lg">Active Courses</Heading>
      {courses.map(course => (
        <Box key={course.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading size="md">{course.title}</Heading>
          <Text>{course.description}</Text>
        </Box>
      ))}
    </VStack>
  )
}
