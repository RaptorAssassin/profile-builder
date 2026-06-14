import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="h-full w-full">
      <h1 className="text-4xl font-extrabold">
        Create your custom profile now
      </h1>
      <Link href="/auth">
        <Button>Login/Sign up</Button>
      </Link>
    </div>
  )
}
