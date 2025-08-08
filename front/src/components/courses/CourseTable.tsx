import type { CourseTableProps } from '@/types'
import {
  Box,
  Button,
  Table,
  Icon,
  Flex
} from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'

export function CourseTable({ courses, onPlayVideos, onEdit, onDelete }: CourseTableProps) {
  return (
    <Box overflowX="auto">
      <Box overflow="hidden" border="2px solid black" borderRadius="lg" minW="700px">
        <Table.Root size="sm">
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
                  <Button size="xs" variant="outline" {...buttonStyle} onClick={() => onPlayVideos(course.id ?? '')}>
                    <Icon as={FaPlay} mr={1} /> Videos
                  </Button>
                </Table.Cell>
                <Table.Cell bg="yellow.100" color="black">
                  <Flex gap={2}>
                    <Button size="xs" variant="outline" {...buttonStyle} onClick={() => onEdit(course.id ?? '')}>
                      Edit
                    </Button>
                    <Button size="xs" variant="outline" {...buttonRedStyle} onClick={() => onDelete(course.id ?? '')}>
                      Delete
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  )
}

const buttonStyle = {
  bg: "white",
  color: "purple",
  border: "2px solid",
  borderColor: "purple",
  _hover: { borderColor: "purple", shadow: "sm" },
  fontWeight: "bold",
  px: 3
}

const buttonRedStyle = {
  bg: "white",
  color: "red",
  border: "2px solid",
  borderColor: "red",
  _hover: { borderColor: "red", shadow: "sm" },
  fontWeight: "bold",
  px: 3
}