import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { StepProps } from "./stepProps";

export const Step3: React.FC<StepProps> = ({ 
  formData, 
  currentSkillInput, 
  handleChange, 
  handleSkillInputChange, 
  handleAddSkill, 
  handleRemoveSkill 
}) => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skillsInput">Your Key Skills</Label>
        <Input
          id="skillsInput"
          value={currentSkillInput} 
          onChange={handleSkillInputChange} 
          onKeyDown={handleAddSkill}
          placeholder="Type a skill and press Enter (e.g. Python, Figma)"
          className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
        <p className="text-xs text-white/60">Press Enter to add a skill tag.</p>
      </div>

      {/* Skills Badge List (Stable structure, list uses the key prop) */}
      <div className="flex flex-wrap gap-2 min-h-[40px] rounded-xl border border-white/15 bg-white/5 p-2">
        {formData.skills.map((skill) => (
          <Badge
            key={skill} // Using the skill name as a stable key
            variant="default"
            className="bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            onClick={() => handleRemoveSkill(skill)}
          >
            {skill}
            <span className="ml-1.5 font-bold opacity-70 hover:opacity-100 transition-opacity">
              &times;
            </span>
          </Badge>
        ))}
        {formData.skills.length === 0 && (
            <span className="text-white/40 text-sm p-1">No skills added yet.</span>
        )}
      </div>

      <div className="space-y-2 pt-4">
        <Label htmlFor="referral">How did you hear about us? (Optional)</Label>
        <Input
          id="referral"
          value={formData.referral} 
          onChange={handleChange}
          placeholder="e.g. Twitter, friend, Google search"
          className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">What are your primary goals for using this platform? (Optional)</Label>
        <Textarea
          id="goals"
          value={formData.goals} 
          onChange={handleChange}
          placeholder="e.g. Collaboration, project management, learning new skills"
          className="min-h-[80px] rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
      </div>
    </div>
)