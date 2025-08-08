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
  useDisclosure,
  AspectRatio,
  Portal
} from '@chakra-ui/react'

import { FaPlay } from 'react-icons/fa'
import { useEffect, useState } from 'react'


export default function CourseListView() {
  const navigate = useNavigate()
  const { courses, loading, fetchCourses } = useCourses()
  const { open, onOpen } = useDisclosure()
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleOpenModal = (courseId: string) => {
    setSelectedCourseId(courseId)
    onOpen()
  }


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
                        onClick={() => course.id && handleOpenModal(course.id)}
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

      {/* Modal for videos */}
      {selectedCourseId && open && (
        <Portal>
          <Box
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg="rgba(0,0,0,0.8)"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={8}
          >
            <Box
              bg="white"
              w="full"
              maxW="960px"
              maxH="90vh"
              overflowY="auto"
              borderRadius="lg"
              p={6}
              boxShadow="2xl"
              position="relative"
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="2xl" fontWeight="extrabold" color="purple">Course Videos</Text>
                <Button
                  variant="outline"
                  border={"2px solid"}
                  _hover={{ borderColor: "purple", shadow: "sm" }}
                  color="purple"
                  bg="white"
                  fontSize="lg"
                  fontWeight="bold"
                  onClick={() => setSelectedCourseId(null)}
                >
                  ✕
                </Button>
              </Flex>

              {/* Videos Slider */}
              <Flex overflowX="auto" gap={4} pb={2}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Box key={idx} minW="320px" flex="0 0 auto">
                    <AspectRatio ratio={16 / 9} w="full">
                      <iframe
                        src="https://www.youtube.com/embed/o8nVBW45gKY"
                        title={`Video ${idx + 1}`}
                        allowFullScreen
                        style={{ borderRadius: '10px' }}
                      />
                    </AspectRatio>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Box>
        </Portal>
      )}


    </Box>
  )
}
