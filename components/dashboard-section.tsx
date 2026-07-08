export function DashboardSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-lg border-2 border-border p-4 ${className || ""}`}
    >
      {children}
    </section>
  )
}
