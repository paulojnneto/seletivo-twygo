import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { customRender as render } from '../../setup'
import CourseForm from '@/components/forms/CourseForm'


const defaultProps = {
  form: {
    title: 'Test Course',
    endDate: '2025-08-10T00:00:00.000Z',
    description: 'Test description',
    videos: []
  },
  videosValue: 'video1.mp4,video2.mp4',
  onChange: vi.fn(),
  onVideosChange: vi.fn(),
  onSubmit: vi.fn(),
  isFormValid: true,
  endDateError: '',
  isEditing: false,
  onCancel: vi.fn()
}


describe('CourseForm', () => {
  it('renders all form fields and buttons', () => {
    render(<CourseForm {...defaultProps} />)

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Video URLs/i)).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument()
  })

  it('displays "Edit Course" title when editing', () => {
    render(<CourseForm {...defaultProps} isEditing />)
    expect(screen.getByText(/Edit Course/i)).toBeInTheDocument()
  })

  it('displays "New Course" title when not editing', () => {
    render(<CourseForm {...defaultProps} isEditing={false} />)
    expect(screen.getByText(/New Course/i)).toBeInTheDocument()
  })

  it('disables Save button when form is invalid', () => {
    render(<CourseForm {...defaultProps} isFormValid={false} />)
    expect(screen.getByRole('button', { name: /Save/i })).toBeDisabled()
  })

  it('shows error message when endDateError is set', () => {
    const errorProps = {
      ...defaultProps,
      endDateError: 'Invalid date'
    }
    render(<CourseForm {...errorProps} />)
    expect(screen.getByText(/Invalid date/i)).toBeInTheDocument()
  })

  it('calls onChange when title input changes', () => {
    render(<CourseForm {...defaultProps} />)
    const titleInput = screen.getByLabelText(/Title/i)
    fireEvent.change(titleInput, { target: { value: 'New title' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
  })

  it('calls onVideosChange when video input changes', () => {
    render(<CourseForm {...defaultProps} />)
    const videoInput = screen.getByLabelText(/Video URLs/i)
    fireEvent.change(videoInput, { target: { value: 'new.mp4' } })
    expect(defaultProps.onVideosChange).toHaveBeenCalled()
  })

  it('calls onSubmit when Save button is clicked', () => {
    render(<CourseForm {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /Save/i }))
    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })

  it('calls onCancel when Cancel button is clicked', () => {
    render(<CourseForm {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(defaultProps.onCancel).toHaveBeenCalled()
  })
})
