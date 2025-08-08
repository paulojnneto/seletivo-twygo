import { useCourses } from '@/hooks/useCourses'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Spinner,
  Text,
  Flex,
} from '@chakra-ui/react'
import { CourseTable } from '@/components/courses/CourseTable'
import { CourseVideosModal } from '@/components/courses/CourseVideosModal'

export default function CourseListView() {
  const navigate = useNavigate()
  const { courses, loading, fetchCourses } = useCourses()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handlePlayVideos = (courseId: string) => {
    setSelectedCourseId(courseId)
    setIsModalOpen(true)
  }

  const handleEdit = (courseId: string) => {
    navigate(`/courses/${courseId}/edit`)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCourseId(null)
  }

  // const selectedCourse = courses.find(c => c.id === selectedCourseId)
  //  const videoUrls = selectedCourse?.videos.length
  //   ? selectedCourse.videos
  //   : [
  //       'https://www.youtube.com/watch?v=o8nVBW45gKY',
  //       'https://www.youtube.com/watch?v=o8nVBW45gKY',
  //       'https://www.youtube.com/watch?v=o8nVBW45gKY',
  //       'https://www.youtube.com/watch?v=o8nVBW45gKY',
  //     ]

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

          <CourseTable
            courses={courses}
            onPlayVideos={handlePlayVideos}
            onEdit={handleEdit}
          />

          <Flex justify="flex-end" mt={8}>
            <Button
              fontWeight="bold"
              bg="white"
              color="purple"
              border="2px solid"
              borderColor="purple"
              borderRadius="30px"
              _hover={{ borderColor: 'purple', shadow: 'sm' }}
              px={6}
              py={2}
              onClick={() => navigate('/courses/new')}
            >
              Add
            </Button>
          </Flex>
        </Box>
      </Flex>

      <CourseVideosModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videos={["https://www.youtube.com/watch?v=mQF5Tknsx5U", "https://www.youtube.com/watch?v=mQF5Tknsx5U", "https://www.youtube.com/watch?v=mQF5Tknsx5U", "https://www.youtube.com/watch?v=mQF5Tknsx5U", "https://www.youtube.com/watch?v=mQF5Tknsx5U"]}
      />
    </Box>
  )
}
