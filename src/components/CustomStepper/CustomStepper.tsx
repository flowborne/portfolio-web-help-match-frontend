import React from 'react'
import { Box, Stepper, Step, StepIconProps } from '@mui/material'
import Check from '@mui/icons-material/Check'
import { CustomConnector, CustomStepIconRoot, CustomStepLabelStyled } from './CustomStepper.styles'
import { CustomStepperProps } from '~types/customStepper'

const CustomStepIcon: React.FC<StepIconProps> = ({ active = false, completed = false, icon }) => (
  <CustomStepIconRoot ownerState={{ active, completed }}>
    {completed ? <Check /> : icon}
  </CustomStepIconRoot>
)
export const CustomStepper: React.FC<CustomStepperProps> = ({ activeStep, steps, width = '600px' }) => (
  <Box sx={{ width, left: 0 }}>
    <Stepper activeStep={activeStep} connector={<CustomConnector />}>
      {steps.map((label, index) => (
        <Step key={index}>
          <CustomStepLabelStyled StepIconComponent={CustomStepIcon}>
            {label}
          </CustomStepLabelStyled>
        </Step>
      ))}
    </Stepper>
  </Box>
)


