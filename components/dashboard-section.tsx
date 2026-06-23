export function DashboardSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-lg border-2 border-border p-4">
      {children}
    </section>
  )
}
