import { useState, useCallback } from 'react'
import axios from 'axios'

interface UseUploadImageReturn {
  uploadImage: (file: File) => Promise<string | undefined>
  isLoading: boolean
}

export const useUploadImage = (): UseUploadImageReturn => {
  const [isLoading, setIsLoading] = useState(false)

  const uploadImage = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append('photo', file)

    try {
      setIsLoading(true)
      const response = await axios.post<{ success: boolean; url: string }>(
        `${import.meta.env.VITE_SERVER_LINK}/api/v1/product/detailphoto`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      return response.data.url
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { uploadImage, isLoading }
}
