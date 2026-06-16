import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row">
      <SidebarProvider defaultOpen={true}>
        <Sidebar collapsible="none">
          <SidebarHeader></SidebarHeader>
          <SidebarContent>
            <SidebarGroup title="Customize Profile">
              <SidebarGroupLabel>Customize Profile</SidebarGroupLabel>
              <SidebarGroupAction />
              <SidebarGroupContent></SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton></SidebarMenuButton>
                  <SidebarMenuAction></SidebarMenuAction>
                  <SidebarMenuBadge></SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter></SidebarFooter>
          <SidebarRail></SidebarRail>
        </Sidebar>
        <main>{children}</main>
      </SidebarProvider>
    </div>
  )
}
