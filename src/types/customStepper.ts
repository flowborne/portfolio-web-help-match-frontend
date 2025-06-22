export interface CustomStepperProps {
    activeStep: number
    steps: string[]
    width?: string
  }
  
  export interface OwnerState {
    active: boolean
    completed: boolean
  }
  