import type { CourseVideosModalProps } from '@/types'
import { getTotalSizeInMB } from '@/utils'
import {
  Box,
  Text,
  Button,
  Flex,
  AspectRatio,
  Portal
} from '@chakra-ui/react'

export function CourseVideosModal({ isOpen, onClose, videos }: CourseVideosModalProps) {
  if (!isOpen) return null

  const videoUrls = videos?.length
    ? videos.map((v) => v.path)
    : []

  return (
    <Portal>
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        bg="rgba(0,0,0,0.8)"
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Box bg="white" w="full" maxW="960px" maxH="90vh" overflowY="auto" borderRadius="lg" p={6}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="2xl" fontWeight="extrabold" color="purple">Course Videos</Text>
            <Button onClick={onClose} {...buttonStyle}>✕</Button>
          </Flex>

          <Flex overflowX="auto" gap={4} pb={2}>
            {videoUrls.map((url, idx) => (
              <Box key={idx} minW="320px" flex="0 0 auto">
                <AspectRatio ratio={16 / 9} w="full">
                  <video key={url} src={`http://localhost:4000${url}`} controls width="100%" />
                </AspectRatio>
              </Box>
            ))}
          </Flex>
          <Flex mt={4} justify="space-between" align="center">
            <Text fontSize="sm" color="gray.600" data-testid="video-size">
              Total size: {getTotalSizeInMB(videos)} MB
            </Text>
          </Flex>        </Box>
      </Box>
    </Portal>
  )
}

const buttonStyle = {
  fontWeight: 'bold',
  bg: 'white',
  color: 'purple',
  border: '2px solid',
  borderColor: 'purple',
  borderRadius: '30px',
  _hover: { borderColor: 'purple', shadow: 'sm' },
  px: 4,
  py: 1
}