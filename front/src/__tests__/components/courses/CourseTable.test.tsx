import { screen, fireEvent } from '@testing-library/react'
import { customRender as render } from '../../setup'
import { CourseTable } from '@/components/courses/CourseTable'
import type { Course } from '@/types'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Test Course',
    description: 'A test description',
    endDate: '2025-12-31',
    videos: [],
  },
]

describe('CourseTable', () => {
  const handlePlayVideos = vi.fn()
  const handleEdit = vi.fn()
  const handleDelete = vi.fn()

  beforeEach(() => {
    render(
      <CourseTable
        courses={mockCourses}
        onPlayVideos={handlePlayVideos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    )
  })

  it('renders all headers correctly', () => {
    expect(screen.getByText(/Course Title/i)).toBeInTheDocument()
    expect(screen.getByText(/End Date/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Description/i)[0]).toBeInTheDocument() //Using the first postion because i rendered one course with description
    expect(screen.getAllByText(/Videos/i)[0]).toBeInTheDocument() //This is because on the content, there is a button written 'videos'
    expect(screen.getByText(/Actions/i)).toBeInTheDocument()
  })

  it('renders course data correctly', () => {
    expect(screen.getByText('Test Course')).toBeInTheDocument()
    expect(screen.getByText('2025-12-31')).toBeInTheDocument()
    expect(screen.getByText('A test description')).toBeInTheDocument()
  })

  it('calls onPlayVideos when play button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /videos/i }))
    expect(handlePlayVideos).toHaveBeenCalledWith('1')
  })

  it('calls onEdit when edit button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(handleEdit).toHaveBeenCalledWith('1')
  })

  it('calls onDelete when delete button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(handleDelete).toHaveBeenCalledWith('1')
  })
})
