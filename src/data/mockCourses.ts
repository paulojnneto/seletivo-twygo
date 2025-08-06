import type { Course } from '@/types'

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Basics',
    description: 'Learn the fundamentals of React.',
    endDate: '2025-12-31',
    videos: [
      { id: 'v1', title: 'Intro', sizeMB: 50, url: '#' },
      { id: 'v2', title: 'JSX', sizeMB: 70, url: '#' }
    ]
  },
  {
    id: '2',
    title: 'Old Course',
    description: 'Should not be shown',
    endDate: '2023-01-01',
    videos: []
  }
]
