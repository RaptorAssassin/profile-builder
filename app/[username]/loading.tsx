import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <Skeleton className="rounded-full p-4">
        <Skeleton className="aspect-square w-sm rounded-full" />
      </Skeleton>
    </div>
  )
}
