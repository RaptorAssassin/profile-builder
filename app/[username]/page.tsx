import { getProfileConfig, getProfileContent } from "@/lib/profile"

type UserPageProps = {
  params: {
    username: string
  }
}

export default async function UserPage({ params: { username } }: UserPageProps) {
  // page for testing layout and rough design
  const config = await getProfileConfig(username)
  const content = await getProfileContent(username)
}
