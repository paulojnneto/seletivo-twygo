import type { Video } from "@/types"

export function parseVideoPaths(input: string): Video[] {
  if (!input) return []

  return input
    .split(',')
    .map(str => str.trim())
    .filter(Boolean)
    .map(path => ({
      path,
      size: 0
    }))
}

export const getTotalSizeInMB = (videos: { size: number }[]) => {
  const totalBytes = videos.reduce((sum, v) => sum + v.size, 0)
  return (totalBytes / 1024 / 1024).toFixed(2) //The video size is on bytes, so I need to calculate
}
