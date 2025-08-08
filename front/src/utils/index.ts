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