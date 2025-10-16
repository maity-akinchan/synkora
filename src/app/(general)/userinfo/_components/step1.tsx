import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils" 
import { StepProps } from "./stepProps";
import { format } from "date-fns"

import {
  Calendar as CalendarIcon,
  UploadCloud,
} from "lucide-react"

export const Step1: React.FC<StepProps> = ({ formData, handleChange, handleProfilePictureUpload, setDateOfBirth }) => {
    return <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Label htmlFor="profilePicture" className="cursor-pointer">
          <Avatar className="h-24 w-24 border-2 border-white/30 hover:border-white transition-colors">
            <AvatarImage src={formData.profilePictureUrl || undefined} alt="@user-profile" />
            <AvatarFallback className="bg-white/10 text-white/50 text-xl font-bold">
              <UploadCloud className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </Label>
        <input
          id="profilePicture"
          type="file"
          className="sr-only"
          accept="image/*"
          onChange={handleProfilePictureUpload}
        />
        <p className="text-sm text-white/60">Upload Profile Picture (Optional)</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="jobRole">Job Title / Role *</Label>
          <Input
            id="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Acme Corp"
            className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10",
                !formData.dateOfBirth && "text-white/40"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-xl" align="start">
            <Calendar
              mode="single"
              selected={formData.dateOfBirth}
              onSelect={setDateOfBirth}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">About You / Portfolio Description</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us a little about your experience or goals..."
          className="min-h-[100px] rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
      </div>
    </div>
}