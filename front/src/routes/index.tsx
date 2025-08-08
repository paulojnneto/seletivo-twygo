import { CourseListView, CourseFormView } from '@/views'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CourseListView />} />
      <Route path="/courses" element={<CourseListView />} />
      <Route path="/courses/new" element={<CourseFormView />} />
      <Route path="/courses/:id/edit" element={<CourseFormView />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
