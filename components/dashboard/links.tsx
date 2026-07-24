import { useState } from "react"
import { Reorder } from "motion/react"
import { type ProfileLink } from "../../types/profile"
import { Combobox } from "../ui/combobox"
import { Input } from "../ui/input"
import { GripVerticalIcon, PlusIcon, TrashIcon } from "lucide-react"
import { Button } from "../ui/button"

type LinksProps = {
  links?: ProfileLink[]
  onChange: (links: ProfileLink[]) => void
}

export default function Links({ links, onChange }: LinksProps) {
  if (!links) {
    return null
  }

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
        {links.map((link, index) => (
          <Reorder.Item key={link.id} value={link} className="hover:cursor-grab">
            <div className="align-center flex justify-center gap-2 rounded-md border border-border p-4">
              <div className="flex items-center justify-center">
                <GripVerticalIcon size={32} className="text-muted-foreground" />
              </div>
              <Combobox></Combobox>
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
              ></Input>
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
              ></Input>
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
        ))}
      </Reorder.Group>
    </div>
  )
}
