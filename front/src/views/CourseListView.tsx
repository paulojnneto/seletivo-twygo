import { VStack, Heading, Text, Box, Button } from '@chakra-ui/react'
import type { Course } from '@/types'

interface Props {
  courses: Course[]
  onEdit?: (course: Course) => void
}

export function CourseListView({ courses, onEdit }: Props) {
  const now = new Date()

  const filtered = courses.filter(course => new Date(course.endDate) > now)

  return (
    <VStack align="stretch">
      {filtered.map(course => (
        <Box key={course.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading size="md">{course.title}</Heading>
          <Text>{course.description}</Text>
          {onEdit && (
            <Button size="sm" mt={2} onClick={() => onEdit(course)}>
              Edit
            </Button>
          )}
        </Box>
      ))}
    </VStack>
  )
}
