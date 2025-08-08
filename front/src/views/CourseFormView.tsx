import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCourses } from '@/hooks/useCourses'
import type { Course } from '@/types'
import {
  Box,
  Button,
  Input,
  Textarea,
  Spinner,
  Text,
  Flex,
} from '@chakra-ui/react'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import moment from 'moment'

export default function CourseFormView() {
  const [endDateError, setEndDateError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const { courses, saveCourse, fetchCourses } = useCourses()

  const [form, setForm] = useState<Course>({
    id: '',
    title: '',
    description: '',
    endDate: '',
    videos: []
  })

  const editingCourse = useMemo(() => {
    return courses.find(c => c.id === id)
  }, [courses, id])

  useEffect(() => {
    if (!courses.length) fetchCourses()
  }, [courses.length, fetchCourses])

  useEffect(() => {
    if (editingCourse) setForm(editingCourse)
  }, [editingCourse])

  const isValidDate = (dateStr: string) => {
    return moment(dateStr, 'YYYY-MM-DD', true).isValid()
  }


  const isFormValid = form.title.trim() !== '' &&
    form.description.trim() !== '' &&
    isValidDate(form.endDate)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setForm(prev => ({ ...prev, [name]: value }))

    if (name === 'endDate') {
      console.log({ value });

      const valid = isValidDate(value)
      console.log({ valid });

      setEndDateError(valid ? '' : 'Invalid date.')
    }
  }

  const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const videos = value.split(',').map(v => v.trim())
    setForm(prev => ({ ...prev, videos }))
  }

  const handleSubmit = async () => {
    const dataToSave = id ? { ...form, id } : form
    await saveCourse(dataToSave)
    navigate('/courses')
  }

  if (id && !editingCourse) return <Spinner size="xl" />

  return (
    <Box w="100vw" h="100vh">
      <Flex minH="100vh" w="100%" align="center" justify="center" bg="purple.200" py={10}>
        <Box
          w="100%"
          maxW="600px"
          p={8}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          border="2px solid"
          borderColor="gray.700"
        >
          <Text fontSize="3xl" fontWeight="extrabold" color="purple" mb={8}>
            {id ? 'Edit Course' : 'New Course'}
          </Text>

          <FormControl mb={4}>
            <FormLabel fontWeight="bold" color="purple">Title</FormLabel>
            <Input
              name="title"
              value={form.title}
              color="black"
              onChange={handleChange}
              bg="yellow.100"
              border="2px solid"
              borderColor="purple"
              _focus={{ borderColor: "purple.700", boxShadow: "sm" }}
            />
          </FormControl>

          <FormControl mb={4} isInvalid={!isValidDate(form.endDate)}>
            <FormLabel fontWeight="bold" color="purple">End Date</FormLabel>
            <Input
              name="endDate"
              type="date"
              color="black"
              value={form.endDate.split('T')[0]}
              onChange={handleChange}
              bg="yellow.100"
              border="2px solid"
              borderColor="purple"
              _focus={{ borderColor: "purple.700", boxShadow: "sm" }}
            />
            {endDateError && <FormErrorMessage color="red">{endDateError}</FormErrorMessage>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontWeight="bold" color="purple">Description</FormLabel>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              color="black"
              bg="yellow.100"
              border="2px solid"
              borderColor="purple"
              _focus={{ borderColor: "purple.700", boxShadow: "sm" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel fontWeight="bold" color="purple">Video URLs (comma-separated)</FormLabel>
            <Input
              name="videos"
              value={form.videos.join(', ')}
              onChange={handleVideosChange}
              color="black"
              bg="yellow.100"
              border="2px solid"
              borderColor="purple"
              _focus={{ borderColor: "purple.700", boxShadow: "sm" }}
            />
          </FormControl>

          <Flex justify="flex-end">
            <Flex justify={"space-between"} w="100%" gap={4}>
              <Button
                fontWeight="bold"
                bg="white"
                color="red"
                border="2px solid"
                borderColor="red"
                borderRadius="30px"
                _hover={{ borderColor: "red", shadow: "sm" }}
                px={6}
                py={2}
                onClick={() => navigate('/courses')}
              >
                Cancel
              </Button>
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
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Save
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
