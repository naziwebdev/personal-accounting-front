export type StepType = "phone" | "otp";

export interface SetStepProps {
  setStep: (step: StepType) => void;
}
