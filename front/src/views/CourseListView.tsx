import { useCourses } from '@/hooks/useCourses'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Spinner, Text } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function CourseListView() {
  const { courses, loading, fetchCourses } = useCourses()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  if (loading) return <Spinner />

  return (
    <Box>
      {courses.map(course => (
        <Box key={course.id}>
          <Text>{course.title}</Text>
          <Button colorPalette="teal" onClick={() => navigate(`/courses/${course.id}/edit`)}>
            Edit
          </Button>
        </Box>
      ))}
      <Button colorPalette="red" onClick={() => navigate(`/courses/new`)}>
        New
      </Button>
    </Box>
  )
}
