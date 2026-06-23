import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard")

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  return response
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
