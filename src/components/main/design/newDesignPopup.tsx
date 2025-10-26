"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconArtboard, IconMarkdown, IconFileSpreadsheet, IconPlus } from "@tabler/icons-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function NewDesignPopup() {
  const [designType, setDesignType] = useState(0);
  const [name, setName] = useState("Untitiled Design")
  const router = useRouter();
  const designTypeArray = ["Canvas", "Markdown", "Spreadsheet"]
  const submitHandler = () => {
    router.push(`/new?design_name=${name}&design_type=${designTypeArray[designType]}`)
  }
  return (
    <Dialog>
      <form onSubmit={submitHandler}>
        <DialogTrigger asChild>
          <Button variant="outline"><IconPlus size={32}/>Create New Design</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[var(--background)]">
          <DialogHeader>
            <DialogTitle>Create New Design</DialogTitle>
            <DialogDescription>
              Create a new design and start collaborating with your team!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Design Name</Label>
              <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className={`bg-[var(--${designType == 0 ? 'primary' : 'secondary'})] px-2 py-4 cursor-pointer`} onClick={() => {setDesignType(0)}}>
                    <p className="text-center text-md font-mono">Canvas</p>
                    <IconArtboard size={44} className="m-auto" />
                </div>
                <div className={`bg-[var(--${designType == 1 ? 'primary' : 'secondary'})] px-2 py-4 cursor-pointer`} onClick={() => {setDesignType(1)}}>
                     <p className="text-center text-md font-mono">Markdown</p>
                    <IconMarkdown size={44} className="m-auto" />
                </div>
                <div className={`bg-[var(--${designType == 2 ? 'primary' : 'secondary'})] px-2 py-4 cursor-pointer`} onClick={() => {setDesignType(2)}}>
                    <p className="text-center text-md font-mono">Spreadsheet</p>
                    <IconFileSpreadsheet size={44} className="m-auto" />
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={submitHandler} className="bg-[var(--primary)]">Create Design</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
