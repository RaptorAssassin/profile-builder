import { NextRequest, NextResponse } from "next/server"

const CDN_URL = process.env.CDN_BASE_URL!
const CDN_API_KEY = process.env.CDN_API_KEY!

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 })
    }

    const uploadData = new FormData()
    uploadData.append("file", file)

    const response = await fetch(`${CDN_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CDN_API_KEY}`,
      },
      body: uploadData,
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          error: await response.text(),
        },
        {
          status: response.status,
        }
      )
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to upload image.",
      },
      {
        status: 500,
      }
    )
  }
}
