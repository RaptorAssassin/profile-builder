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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronDown, SettingsIcon, SquarePenIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ViewProfileButton } from "@/components/view-profile-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const SIDEBAR_ITEMS = [
    {
      title: "Customization",
      icon: SquarePenIcon,
      subItems: [
        { title: "Profile", href: "/dashboard/customize" },
        //{ title: "Links", href: "/dashboard/customize/links" },
      ],
    },
    // {
    //   title: "Settings",
    //   icon: SettingsIcon,
    //   href: "/dashboard/settings",
    // },
  ]

  return (
    <div className="flex flex-row select-none">
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarHeader>
              <h1 className="text-center text-3xl font-extrabold select-none">
                Profile Builder
              </h1>
            </SidebarHeader>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon

                    if (item.subItems) {
                      return (
                        <Collapsible
                          key={item.title}
                          defaultOpen
                          className="group/collapsible"
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                <Icon />
                                <span>{item.title}</span>

                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.subItems.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.href}>
                                    <SidebarMenuSubButton asChild>
                                      <a href={subItem.href}>{subItem.title}</a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      )
                    }

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.href}>
                            <Icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <ViewProfileButton />
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-4 select-text">{children}</main>
      </SidebarProvider>
    </div>
  )
}
