"use client"

import * as React from "react"
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { StepProps } from "./_components/stepProps";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils" 
import {FormData, onUserInfoSubmit} from "@/lib/commons/users"
import {Step1} from "./_components/step1";
import {Step2} from "./_components/step2";
import {Step3} from "./_components/step3";


export default function OnboardingStepper() {
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState<FormData>({
    avatarUrl: null,
    jobRole: "",
    companyName: "",
    dateOfBirth: undefined,
    bio: "",
    teamName: "",
    socialLinks: { linkedin: "", github: "", portfolio: "" },
    skills: ["React", "TypeScript", "Tailwind CSS"],
    referral: "",
    goals: "",
  })
  const [currentSkillInput, setCurrentSkillInput] = React.useState("") 
  
  const totalSteps = 3
  const progressValue = (step / totalSteps) * 100
  const [loading, setLoading] = React.useState(false)
  const [errorState, setErrorState] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  
  // Helper function to update DateOfBirth state directly
  const setDateOfBirth = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dateOfBirth: date }))
  }

  // --- General Form Change Handler ---
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => {
        if (id.startsWith("social-")) {
            const socialKey = id.replace("social-", "") as keyof FormData['socialLinks']
            return {
                ...prev,
                socialLinks: { ...prev.socialLinks, [socialKey]: value }
            }
        }
        return { ...prev, [id]: value }
    })
  }, []) // Use useCallback for stability

  // --- Skills Tag Management ---
  const handleSkillInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSkillInput(e.target.value) 
  }, []) // Use useCallback for stability

  const handleAddSkill = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentSkillInput.trim() !== "") {
      e.preventDefault()
      const newSkill = currentSkillInput.trim()
      
      setFormData(prev => {
        if (!prev.skills.includes(newSkill)) {
          return { ...prev, skills: [...prev.skills, newSkill] }
        }
        return prev
      })
      setCurrentSkillInput("")
    }
  }, [currentSkillInput]) // Dependency on currentSkillInput is necessary

  const handleRemoveSkill = React.useCallback((skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }, []) // Use useCallback for stability

  const handleProfilePictureUpload = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, profilePictureUrl: url }))
    }
  }, []) // Use useCallback for stability

  // --- Navigation Logic ---
  const nextStep = () => {
    // Basic validation before moving to the next step
    setLoading(true);
    if (step === 1 && (!formData.jobRole || !formData.companyName)) return
    if (step === 2 && (!formData.teamName)) return
    
    if (step < totalSteps) {
      setStep(s => s + 1)
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(s => s - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    onUserInfoSubmit(formData, setErrorState, setErrorMessage);
    console.log("Onboarding Data Submitted:", formData)
  }

  // Define the props object once per render to pass to the current step component
  const stepProps: StepProps = {
    formData,
    currentSkillInput,
    handleChange,
    handleSkillInputChange,
    handleAddSkill,
    handleRemoveSkill,
    handleProfilePictureUpload,
    setDateOfBirth,
  }

  const getStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 {...stepProps} />
      case 2:
        return <Step2 {...stepProps} />
      case 3:
        return <Step3 {...stepProps} />
      default:
        return <Step1 {...stepProps} />
    }
  }

  // --- Stepper UI Components (Kept Stable) ---
  // StepIndicator remains defined outside the main component if it doesn't rely on parent state,
  // but it's small enough that keeping it here is fine. Moved it outside for maximum stability.
  const StepIndicator = ({ number, title, active }: { number: number, title: string, active: boolean }) => (
    <div className="flex flex-col items-center">
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold",
        active ? "border-white bg-white text-black" : "border-white/20 text-white/50"
      )}>
        {number}
      </div>
      <span className={cn("mt-2 text-xs hidden sm:block", active ? "text-white" : "text-white/50")}>
        {title}
      </span>
    </div>
  )


  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-2xl rounded-[30px] border-white/15 bg-black text-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pt-8">
          <CardTitle className="text-3xl font-bold">Welcome to the Club!</CardTitle>
          <CardDescription className="text-white/70">
            Let&apos;s finalize your profile and set up your workspace.
          </CardDescription>
          
          {/* Stepper Navigation */}
          <div className="mt-4 flex items-center justify-between px-4">
            <StepIndicator number={1} title="Personal Info" active={step >= 1} />
            <div className={cn("h-0.5 flex-1 mx-2", step > 1 ? "bg-white" : "bg-white/20")} />
            <StepIndicator number={2} title="Workspace & Links" active={step >= 2} />
            <div className={cn("h-0.5 flex-1 mx-2", step > 2 ? "bg-white" : "bg-white/20")} />
            <StepIndicator number={3} title="Skills & Final" active={step >= 3} />
          </div>

          <Progress value={progressValue} className="h-1 bg-white/10 [&>*]:bg-white" />
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* The current step component is rendered here */}
            {getStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1 || loading}
                className="justify-center gap-2 rounded-xl border-white/20 bg-transparent text-white hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className={cn(
                    "justify-center gap-2 rounded-xl text-black",
                    (step === 1 && (!formData.jobRole || !formData.companyName)) || (step === 2 && !formData.teamName) 
                      ? "bg-white/50 cursor-not-allowed" 
                      : "bg-white hover:bg-white/90"
                  )}
                  disabled={(step === 1 && (!formData.jobRole || !formData.companyName)) || (step === 2 && !formData.teamName) || loading}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  className="justify-center gap-2 rounded-xl bg-white text-black hover:bg-white/90"
                >
                  {loading ? "Completing..." : "Finish Setup"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}