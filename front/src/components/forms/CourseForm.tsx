import type { CourseFormProps } from "@/types"
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { Button, Flex, Input, Text, Textarea } from "@chakra-ui/react"


export default function CourseForm({
  form,
  videosValue,
  onChange,
  onVideosChange,
  onSubmit,
  isFormValid,
  endDateError,
  isEditing,
  onCancel
}: CourseFormProps) {
  return (
    <>
      <Text fontSize="3xl" fontWeight="extrabold" color="purple" mb={8}>
        {isEditing ? 'Edit Course' : 'New Course'}
      </Text>

      <FormControl mb={4}>
        <FormLabel htmlFor="title" fontWeight="bold" color="purple">Title</FormLabel>
        <Input id="title" name="title" value={form.title} onChange={onChange} {...inputStyle} />
      </FormControl>

      <FormControl mb={4} isInvalid={!!endDateError}>
        <FormLabel htmlFor="endDate" fontWeight="bold" color="purple">End Date</FormLabel>
        <Input id="endDate" name="endDate" type="date" value={form.endDate.split('T')[0]} onChange={onChange} {...inputStyle} />
        {endDateError && <FormErrorMessage color="red">{endDateError}</FormErrorMessage>}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="description" fontWeight="bold" color="purple">Description</FormLabel>
        <Textarea id="description" name="description" value={form.description} onChange={onChange} {...inputStyle} />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel htmlFor="videos" fontWeight="bold" color="purple">Video URLs (comma-separated)</FormLabel>
        <Input id="videos" name="videos" value={videosValue} onChange={onVideosChange} {...inputStyle} />
      </FormControl>

      <Flex justify="flex-end">
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={4}
          mt={6}
          justify="space-between"
        >
          <Button {...cancelButtonStyle} onClick={onCancel}>Cancel</Button>
          <Button {...saveButtonStyle} onClick={onSubmit} disabled={!isFormValid}>Save</Button>
        </Flex>
      </Flex>
    </>
  )
}

const inputStyle = {
  color: 'black',
  bg: 'yellow.100',
  border: '2px solid',
  borderColor: 'purple',
  _focus: { borderColor: 'purple.700', boxShadow: 'sm' }
}

const cancelButtonStyle = {
  fontWeight: 'bold',
  bg: 'white',
  color: 'red',
  border: '2px solid',
  borderColor: 'red',
  borderRadius: '30px',
  _hover: { borderColor: 'red', shadow: 'sm' },
  px: 6,
  py: 2
}

const saveButtonStyle = {
  fontWeight: 'bold',
  bg: 'white',
  color: 'purple',
  border: '2px solid',
  borderColor: 'purple',
  borderRadius: '30px',
  _hover: { borderColor: 'purple', shadow: 'sm' },
  px: 6,
  py: 2
}
