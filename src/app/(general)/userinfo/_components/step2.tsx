import { StepProps } from "./stepProps";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Calendar as CalendarIcon,
  UploadCloud,
} from "lucide-react"

export const Step2: React.FC<StepProps> = ({ formData, handleChange }) => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="teamName">Create Your Team Name *</Label>
        <Input
          id="teamName"
          value={formData.teamName}
          onChange={handleChange}
          placeholder="e.g. The Innovators, Project Phoenix"
          className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
          required
        />
        <p className="text-xs text-white/60">This will be the default workspace for your projects.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Social Links</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="social-linkedin">LinkedIn Profile URL</Label>
            <Input
              id="social-linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="social-github">GitHub Profile URL</Label>
            <Input
              id="social-github"
              value={formData.socialLinks.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="social-portfolio">Personal Website/Portfolio URL</Label>
            <Input
              id="social-portfolio"
              value={formData.socialLinks.portfolio}
              onChange={handleChange}
              placeholder="https://my-portfolio.com"
              className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </div>
)