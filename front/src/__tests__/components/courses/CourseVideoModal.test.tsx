import { CourseVideosModal } from '@/components/courses/CourseVideosModal'
import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { customRender as render } from '../../setup'
import { beforeEach } from 'node:test'


const mockVideos = [
  { path: '/videos/video1.mp4', size: 1048576 }, // 1MB
  { path: '/videos/video2.mp4', size: 2097152 }  // 2MB
]

describe('CourseVideosModal', () => {

  beforeEach(() => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'chakra-portal')
    document.body.appendChild(portalRoot)
  })


  it('does not render when isOpen is false', () => {
    render(
      <CourseVideosModal isOpen={false} onClose={vi.fn()} videos={mockVideos} />
    )
    expect(screen.queryByTestId('video-size')).not.toBeInTheDocument()
  })

  it('renders correctly when isOpen is true', () => {
    render(
      <CourseVideosModal isOpen={true} onClose={vi.fn()} videos={mockVideos} />
    )
    expect(screen.getByText(/Course Videos/i)).toBeInTheDocument()
  })

  it('renders all video elements', () => {
    render(
      <CourseVideosModal isOpen={true} onClose={vi.fn()} videos={mockVideos} />
    )

    const videos = document.querySelectorAll('video') //using document instead of content because portal is used to render the modal/videos

    expect(videos.length).toBe(mockVideos.length)
  })

  it('displays total size of videos in MB', () => {
    render(
      <CourseVideosModal isOpen={true} onClose={vi.fn()} videos={mockVideos} />
    )

    expect(screen.getByTestId('video-size')).toHaveTextContent('Total size: 3.00 MB')
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()

    render(
      <CourseVideosModal isOpen={true} onClose={handleClose} videos={mockVideos} />
    )

    fireEvent.click(screen.getByRole('button', { name: /✕/i }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
