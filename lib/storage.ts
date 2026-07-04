import imageCompression from "browser-image-compression"

/**
 * Optimizes a provided image file by compressing it with the browser-image-compression library to reduce its size
 * @param image - The image to be optimized
 * @returns A promise resolving to the optimized image file
 */
async function optimizeImage(image: File): Promise<File> {
  try {
    const optimized = await imageCompression(image, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      initialQuality: 0.75,
      fileType: "image/webp",
    })
    return optimized
  } catch (error) {
    throw new Error(`Failed to optimize image: ${error}`)
    return image
  }
}

/**
 * Extracts the ID of an image from its URL in the CDN
 * @param url - The URL of the image in the CDN
 * @returns The ID of the image extracted from the URL, or null if the URL is invalid
 */
function getImageIdFromUrl(url: string): string | null {
  try {
    const pathname = new URL(url).pathname
    const [id] = pathname.split("/").filter(Boolean)

    return id ?? null
  } catch {
    return null
  }
}

/**
 * Uploads an image to the CDN after optimizing it
 * @param image - The image file to be uploaded
 * @returns A promise resolving to the URL of the uploaded image
 */
export async function uploadImage(image: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", await optimizeImage(image))

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const { url } = await response.json()

  return url
}

/**
 * Deletes an image from the CDN using its URL
 * @param imageUrl - The URL of the image to delete
 * @returns A promise resolving when the image is deleted
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  const id = getImageIdFromUrl(imageUrl)

  if (!id) {
    throw new Error("Invalid Hack Club asset URL.")
  }

  const response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }
}

/**
 * Updates an image by first deleting the old image and then uploading a new one
 * @param imageUrl - The URL of the image to be replaced
 * @param image - The new image file to upload
 * @returns A promise resolving to the URL of the updated image
 */
export async function updateImage(currentImageUrl: string, newImage: File): Promise<string> {
  await deleteImage(currentImageUrl)
  return uploadImage(newImage)
}
