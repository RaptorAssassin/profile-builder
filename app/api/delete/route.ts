import { NextRequest, NextResponse } from "next/server"

const CDN_URL = process.env.CDN_BASE_URL!
const CDN_API_KEY = process.env.CDN_API_KEY!

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing asset ID." }, { status: 400 })
    }

    const response = await fetch(`${CDN_URL}/upload/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${CDN_API_KEY}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: "Failed to delete image." }, { status: 500 })
  }
}
