import { Reorder } from "motion/react"
import { LinkIcon, type ProfileLink } from "../../types/profile"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "../ui/combobox"
import { Input } from "../ui/input"
import { GripVerticalIcon, PlusIcon, TrashIcon } from "lucide-react"
import { Button } from "../ui/button"
import { ICON_COMPONENTS } from "../link-icon"
import { capitalized } from "@/lib/utils"

type LinksProps = {
  links?: ProfileLink[]
  onChange: (links: ProfileLink[]) => void
}

export default function Links({ links, onChange }: LinksProps) {
  if (!links) {
    return null
  }

  const icons = Object.keys(ICON_COMPONENTS) as LinkIcon[]

  return (
    <div className="">
      <Button
        className="mb-2 flex items-center gap-2 rounded-md border border-border p-4"
        variant="outline"
        onClick={() => {
          const newLinks = [
            {
              id: Date.now().toString() + Math.random().toString(),
              name: "",
              url: "",
              icon: "website" as LinkIcon,
            } as ProfileLink,
            ...links,
          ]
          onChange(newLinks)
        }}
      >
        Add Link
        <PlusIcon />
      </Button>
      <Reorder.Group
        axis="y"
        values={links}
        onReorder={onChange}
        className="flex flex-col flex-wrap gap-2"
        layout
      >
        {links.map((link, index) => {
          const Icon = ICON_COMPONENTS[link.icon]
          return (
            <Reorder.Item key={link.id} value={link} className="hover:cursor-grab">
              <div className="align-center flex flex-wrap justify-start gap-2 rounded-md border border-border p-4 md:flex-nowrap">
                <div className="mr-4 flex items-center justify-center">
                  <GripVerticalIcon size={32} className="text-muted-foreground" />
                </div>
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center">
                    <div className="h-full w-full">
                      {Icon && <Icon className="h-full w-full" />}
                    </div>
                  </div>
                  <Combobox
                    value={link.icon}
                    items={icons}
                    onValueChange={(value) => {
                      if (!value) return
                      const newLinks = [...links]
                      newLinks[index] = {
                        ...newLinks[index],
                        icon: value as LinkIcon,
                      }
                      onChange(newLinks)
                    }}
                    itemToStringLabel={(icon) => (icon ? capitalized(icon) : "")}
                  >
                    <ComboboxInput placeholder="Icon" className="min-w-40" />
                    <ComboboxContent>
                      <ComboboxEmpty>No icon found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => {
                          const Icon = ICON_COMPONENTS[item as LinkIcon]
                          return (
                            <ComboboxItem key={item} value={item}>
                              <Icon />
                              {capitalized(item)}
                            </ComboboxItem>
                          )
                        }}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
                <Input
                  placeholder="Name (Optional)"
                  name="name"
                  type="text"
                  value={link.name}
                  onChange={(e) => {
                    const newLinks = [...links]
                    newLinks[index] = {
                      ...newLinks[index],
                      name: e.target.value,
                    }
                    onChange(newLinks)
                  }}
                  className="min-w-40"
                />
                <Input
                  placeholder="Link"
                  name="link"
                  type="text"
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...links]
                    newLinks[index] = {
                      ...newLinks[index],
                      url: e.target.value,
                    }
                    onChange(newLinks)
                  }}
                  className="min-w-40"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newLinks = [...links]
                    newLinks.splice(index, 1)
                    onChange(newLinks)
                  }}
                >
                  <TrashIcon />
                </Button>
              </div>
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </div>
  )
}
