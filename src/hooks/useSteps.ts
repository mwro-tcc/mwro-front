import { useState } from "react";

export default function useSteps(steps: number, { initialStep = 1 } = {}) {
  const [step, setStep] = useState(initialStep)

  const next = () => {
    if (step < steps) setStep(step + 1)
  }

  const back = () => {
    if (step > 1) setStep(step - 1)
  }

  return {
    step,
    next,
    back
  }
}