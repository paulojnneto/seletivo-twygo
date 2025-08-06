import {
  Box,
  Button,
  Input,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useState } from 'react'
import type { Course, Props } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export function CourseFormView({ onSave, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [endDate, setEndDate] = useState(initialData?.endDate || '')

  const handleSubmit = () => {
    const newCourse: Course = {
      id: initialData?.id || uuidv4(),
      title,
      description,
      endDate,
      videos: initialData?.videos || []
    }
    onSave(newCourse)
  }

  return (
    <Box p={4}>
      <VStack align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>End Date</FormLabel>
          <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          {initialData ? 'Update Course' : 'Create Course'}
        </Button>
      </VStack>
    </Box>
  )
}
