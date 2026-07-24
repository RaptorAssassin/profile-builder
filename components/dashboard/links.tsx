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
      <div
        className="mb-4 flex items-center gap-2 rounded-md border border-border p-4"
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
      </div>
      <Reorder.Group
        axis="y"
        values={links}
        onReorder={onChange}
        className="flex flex-col gap-2"
        layout
      >
        {links.map((link, index) => {
          const Icon = ICON_COMPONENTS[link.icon]
          return (
            <Reorder.Item key={link.id} value={link} className="hover:cursor-grab">
              <div className="align-center flex justify-start gap-2 rounded-md border border-border p-4">
                <div className="flex items-center justify-center">
                  <GripVerticalIcon size={32} className="text-muted-foreground" />
                </div>
                <div className="flex items-center justify-center">{Icon && <Icon />}</div>
                <Combobox
                  value={link.icon || ""}
                  items={icons}
                  onInputValueChange={(value) => {
                    const newLinks = [...links]
                    newLinks[index] = {
                      ...newLinks[index],
                      icon: value as LinkIcon,
                    }
                    onChange(newLinks)
                  }}
                  //options={icons.map((icon) => ({ value: icon, label: icon }))]
                >
                  <ComboboxInput placeholder="Icon" />
                  <ComboboxContent>
                    <ComboboxEmpty>No icon found.</ComboboxEmpty>
                    <ComboboxList>
                      {icons.map((icon) => {
                        const Icon = ICON_COMPONENTS[icon]
                        return (
                          <ComboboxItem key={icon} value={icon}>
                            <Icon />
                            {icon.charAt(0).toUpperCase() + icon.slice(1)}
                          </ComboboxItem>
                        )
                      })}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <Input
                  placeholder="Name (Optional)"
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
                  className="max-w-2xs"
                />
                <Input
                  placeholder="Link"
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
                  className="max-w-2xs"
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
