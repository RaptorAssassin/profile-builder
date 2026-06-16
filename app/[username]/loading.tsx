import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-black">
      <div className="flex h-100 w-142.5 flex-col items-center justify-end gap-4 rounded-4xl bg-accent/50 p-4">
        <Skeleton className="aspect-square h-28 w-28 rounded-full" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-10 w-full rounded-full" key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
