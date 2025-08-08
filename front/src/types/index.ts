export interface Video {
  id: string
  title: string
  sizeMB: number
  url: string
}

export interface Course {
  id?: string
  title: string
  description: string
  endDate: string // ISO format
  videos: Video[]
}

export interface Props {
  onSave: (course: Course) => void
  initialData?: Course
}

export type CourseFormProps = {
  form: Course
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onVideosChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  isFormValid: boolean
  endDateError: string
  isEditing: boolean
  onCancel: () => void
}

export interface CourseTableProps {
  courses: Course[]
  onPlayVideos: (courseId: string) => void
  onEdit: (courseId: string) => void
}

export interface CourseVideosModalProps {
  isOpen: boolean
  onClose: () => void
  videos: string[]
}