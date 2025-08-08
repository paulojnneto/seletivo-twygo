import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCourses } from '@/hooks/useCourses'
import type { Course } from '@/types'
import {
  Box,
  Spinner,
  Flex,
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast"
import CourseForm from '@/components/forms/CourseForm'
import moment from 'moment'

export default function CourseFormView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { courses, saveCourse, fetchCourses } = useCourses()

  const [form, setForm] = useState<Course>({
    id: '',
    title: '',
    description: '',
    endDate: '',
    videos: [],
  })

  const [endDateError, setEndDateError] = useState<string>('')

  const editingCourse = useMemo(() => {
    return courses.find(c => c.id === id)
  }, [courses, id])

  useEffect(() => {
    if (!courses.length) fetchCourses()
  }, [courses.length, fetchCourses])

  useEffect(() => {
    if (editingCourse) setForm(editingCourse)
  }, [editingCourse])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    if (name === 'endDate') {
      const isValid = moment(value, 'YYYY-MM-DD', true).isValid()
      setEndDateError(isValid ? '' : 'Invalid date format (YYYY-MM-DD)')
    }
  }

  const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videos = e.target.value.split(',').map(v => v.trim())
    setForm(prev => ({ ...prev, videos }))
  }

  const handleSubmit = async () => {
    try {
      const dataToSave = id ? { ...form, id } : form
      await saveCourse(dataToSave)
      toast({ title: 'Course saved successfully.', status: 'success', duration: 3000, isClosable: true })
      navigate('/courses')
    } catch (error) {
      console.log({ error });
      toast({ title: 'Error saving course.', status: 'error', duration: 3000, isClosable: true })
    }
  }

  const isFormValid = form.title && form.description && form.endDate && !endDateError

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
          <CourseForm
            form={form}
            onChange={handleChange}
            onVideosChange={handleVideosChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/courses')}
            isFormValid={!!isFormValid}
            endDateError={endDateError}
            isEditing={!!id}
          />
        </Box>
      </Flex>
    </Box>
  )
}
