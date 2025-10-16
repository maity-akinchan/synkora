export interface StepProps {
  formData: FormData
  currentSkillInput: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSkillInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddSkill: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleRemoveSkill: (skillToRemove: string) => void
  handleProfilePictureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  setDateOfBirth: (date: Date | undefined) => void
}
