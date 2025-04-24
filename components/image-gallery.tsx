"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type GalleryImage = {
  id: string
  src: string
  alt: string
  contributor?: string
}

// This component will fetch images from an API in production
// For now, it uses placeholder images but is structured for real data
export function ImageGallery({
  initialImages = [],
  category = "nature",
  limit = 4,
}: {
  initialImages?: GalleryImage[]
  category?: string
  limit?: number
}) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [loading, setLoading] = useState(initialImages.length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In production, this would fetch from your API
    // For now, we'll generate placeholder images
    if (initialImages.length === 0) {
      const fetchImages = async () => {
        try {
          setLoading(true)

          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 500))

          // Generate placeholder images
          // In production, this would be replaced with a real API call
          const placeholderQueries = [
            "forest+sunlight",
            "calm+lake+reflection",
            "coastal+sunset",
            "desert+landscape",
            "mountain+peak+snow",
            "tropical+waterfall",
            "autumn+forest+colors",
            "northern+lights",
          ]

          const mockImages: GalleryImage[] = placeholderQueries.slice(0, limit).map((query, index) => ({
            id: `img-${index}`,
            src: `/placeholder.svg?height=600&width=600&query=${query}`,
            alt: query.replace("+", " "),
            contributor: `User ${index + 1}`,
          }))

          setImages(mockImages)
        } catch (err) {
          console.error("Error fetching images:", err)
          setError("Failed to load images")
        } finally {
          setLoading(false)
        }
      }

      fetchImages()
    }
  }, [initialImages, limit])

  if (error) {
    return <div className="text-white/60 text-center py-8">{error}</div>
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="aspect-square relative rounded-lg overflow-hidden group">
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {image.contributor && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Photo by {image.contributor}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
