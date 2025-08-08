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
      <Flex minH="100vh" w="100%" align="center" justify="center" bg="purple.200" py={10}>
        <Box
          w="100%"
          maxW="1000px"
          p={8}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          border="2px solid"
          borderColor="gray.700"
        >
          <Text fontSize="4xl" fontWeight="extrabold" color="purple" mb={8}>
            Courses
          </Text>

          <Box overflow="hidden" border="2px solid black" borderRadius="lg">
            <Table.Root size="sm" >
              <Table.ColumnGroup>
                <Table.Column htmlWidth="30%" />
                <Table.Column htmlWidth="20%" />
                <Table.Column htmlWidth="30%" />
                <Table.Column htmlWidth="10%" />
                <Table.Column htmlWidth="10%" />
              </Table.ColumnGroup>

              <Table.Header>
                <Table.Row>
                  {['Course Title', 'End Date', 'Description', 'Videos', 'Actions'].map((header) => (
                    <Table.ColumnHeader key={header} bg="purple" color="white" fontWeight="bold">
                      {header}
                    </Table.ColumnHeader>
                  ))}
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
                        borderColor="purple"
                        _hover={{ borderColor: "purple", shadow: "sm" }}
                        variant="outline"
                        fontWeight="bold"
                        px={3}
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
                        border="2px solid"
                        borderColor="purple"
                        _hover={{ borderColor: "purple", shadow: "sm" }}
                        variant="outline"
                        fontWeight="bold"
                        px={3}
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

          <Flex justify="flex-end" mt={8}>
            <Button
              fontWeight="bold"
              bg="white"
              color="purple"
              border="2px solid"
              borderColor="purple"
              borderRadius="30px"
              _hover={{ borderColor: "purple", shadow: "sm" }}
              px={6}
              py={2}
              onClick={() => navigate('/courses/new')}
            >
              Add
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
