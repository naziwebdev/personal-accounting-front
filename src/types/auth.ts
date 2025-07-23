export type StepType = "phone" | "otp";


export interface SetStepProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}