import { DashboardSection } from "@/components/dashboard-section";
import { ProfileStatus } from "@/components/profile-status";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function Dashboard() {

    return (
    <div className="h-full w-full">
      {/* TODO: Show Analytics like profile views in a short summary */}
      {/* When the user doesn't have a profile created, show a prompt to create one with a specific username */}
      <Suspense>
        <ProfileStatus />
      </Suspense>
      
    </div>
  )
}
