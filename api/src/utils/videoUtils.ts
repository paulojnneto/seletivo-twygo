import { stat } from 'fs/promises'
import path from 'path'

export async function getVideoWithSize(videoPath: string) {
  const basePath = path.resolve(process.cwd(), 'dist', 'videos')
  const fileName = path.basename(videoPath) // Ex: v1.mp4
  const fullPath = path.join(basePath, fileName)

  try {
    const stats = await stat(fullPath)

    return {
      path: `/api/courses/videos/${fileName}`,
      size: stats.size
    }
  } catch (err) {
    console.error(`Error fetching video size ${videoPath}:`, err)

    return {
      path: `/api/courses/videos/${fileName}`,
      size: 0
    }
  }
}
