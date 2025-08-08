import { useCourses } from '@/hooks/useCourses'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Spinner,
  Table,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { useEffect } from 'react'

export default function CourseListView() {
  const { courses, loading, fetchCourses } = useCourses()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  if (loading) return <Spinner size="xl" />

  return (
    <Box w="100vw" h="100vh">
      <Flex minH="100vh" w='100%' align="center" justify="center" bg='purple.200' py={10}>
        <Box w="100%" maxW="1000px" color="black" p={6} bg="white" boxShadow="md" border="2px solid" borderColor="gray.700" borderRadius="md">
          <Text fontSize="3xl" fontWeight="extrabold" color="purple" mb={6}>
            Courses
          </Text>

          <Box overflowX="auto" border="2px solid" borderColor="black" borderRadius="md">
            <Table.Root size="sm" color="white" striped >
              <Table.ColumnGroup>
                <Table.Column htmlWidth="30%" />
                <Table.Column htmlWidth="20%" />
                <Table.Column htmlWidth="30%" />
                <Table.Column htmlWidth="10%" />
                <Table.Column htmlWidth="10%" />
              </Table.ColumnGroup>

              <Table.Header >
                <Table.Row >
                  <Table.ColumnHeader bg='purple' fontWeight="bold">Course Title</Table.ColumnHeader>
                  <Table.ColumnHeader bg='purple' fontWeight="bold">End Date</Table.ColumnHeader>
                  <Table.ColumnHeader bg='purple' fontWeight="bold">Description</Table.ColumnHeader>
                  <Table.ColumnHeader bg='purple' fontWeight="bold">Videos</Table.ColumnHeader>
                  <Table.ColumnHeader bg='purple' fontWeight="bold">Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {courses.map((course) => (
                  <Table.Row key={course.id}>
                    <Table.Cell bg="yellow.100" color="black" fontWeight="semibold">{course.title}</Table.Cell>
                    <Table.Cell bg="yellow.100" color="black">{course.endDate.split('T')[0]}</Table.Cell>
                    <Table.Cell bg="yellow.100" color="black">{course.description}</Table.Cell>
                    <Table.Cell bg="yellow.100" color="black">
                      <Button
                        size="xs"
                        bg="white"
                        color="purple"
                        border="2px solid"
                        variant="outline"
                        borderColor="purple"
                        onClick={() => navigate(`/courses/${course.id}/videos`)}
                      >
                        <Icon as={FaPlay} mr={1} /> Videos
                      </Button>
                    </Table.Cell>
                    <Table.Cell bg="yellow.100" color="black">
                      <Button
                        size="xs"
                        bg="white"
                        color="purple"
                        variant="outline"
                        border="2px solid"
                        borderColor="purple"
                        onClick={() => navigate(`/courses/${course.id}/edit`)}
                      >
                        Edit
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          <Flex justify="flex-end" mt={6}>
            <Button fontWeight="bold" bg='white' color="purple" variant="outline" size="md" border="2px solid" borderColor="purple" borderRadius="30px" onClick={() => navigate('/courses/new')}>
              Add
            </Button>
          </Flex>
        </Box >
      </Flex >
    </Box >
  )
}
