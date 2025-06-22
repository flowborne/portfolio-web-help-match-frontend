
import { styled } from '@mui/material/styles'
import { StepConnector, StepLabel } from '@mui/material'
import { OwnerState } from '~types/customStepper'
import { ACTIVE_COLOR, BORDER_RADIUS, COMPLETED_COLOR, DEFAULT_LINE_COLOR, ICON_SIZE } from './CustomStepper.constants'



export const CustomConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {},
  active: {
    '& .MuiStepConnector-line': {
      borderColor: COMPLETED_COLOR,
      backgroundColor: COMPLETED_COLOR,
    },
  },
  completed: {
    '& .MuiStepConnector-line': {
      borderColor: COMPLETED_COLOR,
      backgroundColor: COMPLETED_COLOR,
    },
  },
  line: {
    borderColor: DEFAULT_LINE_COLOR(theme),
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))

export const CustomStepIconRoot = styled('div')<{
  ownerState: OwnerState
}>(({ theme, ownerState }) => ({
  backgroundColor: DEFAULT_LINE_COLOR(theme),
  zIndex: 1,
  color: '#fff',
  width: ICON_SIZE,
  height: ICON_SIZE,
  display: 'flex',
  borderRadius: BORDER_RADIUS,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  ...(ownerState.active && {
    backgroundColor: ACTIVE_COLOR,
    border: `2px solid ${theme.palette.primary.main}`,
  }),
  ...(ownerState.completed && {
    backgroundColor: COMPLETED_COLOR,
  }),
}))

export const CustomStepLabelStyled = styled(StepLabel)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  '& .MuiStepLabel-label': {
    marginLeft: theme.spacing(1),
  },
}))
