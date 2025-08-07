import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCourses } from '@/hooks/useCourses'
import type { Course } from '@/types'
import {
  Box,
  Button,
  Input,
  Textarea,
  Spinner
} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'

export default function CourseFormView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { courses, saveCourse, fetchCourses } = useCourses()

  const isCreating = id === 'new'

  const [form, setForm] = useState<Course>({
    id: '',
    title: '',
    description: '',
    endDate: '',
    videos: []
  })

  const editingCourse = useMemo(
    () => courses.find(c => c.id === id),
    [courses, id]
  )

  useEffect(() => {
    if (!courses.length) {
      fetchCourses()
    }
  }, [courses.length, fetchCourses])

  useEffect(() => {
    if (!isCreating && editingCourse) {
      setForm(editingCourse)
    }
  }, [editingCourse, isCreating])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const dataToSave = isCreating ? form : { ...form, id }
    await saveCourse(dataToSave)
    navigate('/courses')
  }

  if (!isCreating && id && !editingCourse) return <Spinner />

  return (
    <Box maxW="600px" mx="auto">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={form.title} onChange={handleChange} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" value={form.description} onChange={handleChange} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>End Date</FormLabel>
        <Input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
      </FormControl>

      <Button mt={6} colorPalette="teal" onClick={handleSubmit}>
        Save Course
      </Button>
    </Box>
  )
}

