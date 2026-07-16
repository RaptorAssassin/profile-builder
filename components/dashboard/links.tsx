import { useState } from "react"
import { type ProfileLink, type IconDesign } from "@/types/profile"
import { ICON_COMPONENTS } from "../link-icon"
import { PlusCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Combobox } from "../ui/combobox"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

type LinksProps = {
  links?: ProfileLink[]
  iconDesign?: IconDesign
  onChange?: (links: ProfileLink[]) => void
}

const ICON_OPTIONS = Object.keys(ICON_COMPONENTS).map((icon) => ({
  label: icon.charAt(0).toUpperCase() + icon.slice(1),
  value: icon,
}))

export default function Links({ links = [], onChange }: LinksProps) {
  const [dialogOpen, setDialogOpen] = useState<ProfileLink | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const cardClassName =
    "rounded-(--radius) bg-card p-2 flex items-center justify-center w-2xs h-20 cursor-pointer"

  const handleAddLink = () => {
    const newLink: ProfileLink = {
      name: "",
      url: "",
      icon: "website",
    }
    setDialogOpen(newLink)
    setIsAddingNew(true)
  }

  const handleSaveLink = (updatedLink: ProfileLink) => {
    if (!onChange) return

    if (isAddingNew) {
      onChange([...links, updatedLink])
    } else {
      const updatedLinks = links.map((link) => (link.url === dialogOpen?.url ? updatedLink : link))
      onChange(updatedLinks)
    }

    setDialogOpen(null)
    setIsAddingNew(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {links.map((link, index) => {
          const IconComponent = ICON_COMPONENTS[link.icon] || ICON_COMPONENTS["website"]
          return (
            <div
              className={cn(cardClassName)}
              key={index}
              onClick={() => {
                setDialogOpen(link)
                setIsAddingNew(false)
              }}
            >
              <IconComponent className="" />
            </div>
          )
        })}
      </div>
      <div className={cn(cardClassName, "flex gap-2")} onClick={handleAddLink}>
        <PlusCircleIcon />
        Add Link
      </div>

      <LinkEditor
        link={dialogOpen}
        open={dialogOpen !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogOpen(null)
            setIsAddingNew(false)
          }
        }}
        onSave={handleSaveLink}
      />
    </div>
  )
}

type LinkEditorProps = {
  link: ProfileLink | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (link: ProfileLink) => void
}

function LinkEditor({ link, open, onOpenChange, onSave }: LinkEditorProps) {
  const [name, setName] = useState(link?.name ?? "")
  const [url, setUrl] = useState(link?.url ?? "")
  const [icon, setIcon] = useState(link?.icon ?? "website")

  const handleSave = () => {
    if (!name.trim()) {
      //alert("Please enter a link name")
      return
    }
    if (!url.trim()) {
      //alert("Please enter a valid URL")
      return
    }

    const updatedLink: ProfileLink = {
      name: name.trim(),
      url: url.trim(),
      icon,
    }

    onSave(updatedLink)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setName("")
      setUrl("")
      setIcon("website")
      onOpenChange(false)
    }
  }

  if (!link) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize Link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {/* <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g., LinkedIn, TikTok"
            />
          </Field> */}

          <Field>
            <FieldLabel>Icon</FieldLabel>
            <Combobox
              //options={ICON_OPTIONS}
              value={icon}
              onValueChange={(value) => {
                if (value) {
                  setIcon(value)
                }
              }}

              placeholder="Select an icon"
            />
          </Field>

          <Field>
            <FieldLabel>URL</FieldLabel>
            <Input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com"
            />
          </Field>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
