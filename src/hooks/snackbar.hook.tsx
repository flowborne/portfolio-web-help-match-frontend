import { createContext, ReactNode, useContext, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import Typography from '@mui/material/Typography'
interface SnackbarContextType {
  showSnackbar: (
    message: ReactNode | string,
    severity?: 'success' | 'error' | 'warning' | 'info',
    action?: ReactNode
  ) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
)

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<ReactNode | string>('')
  const [severity, setSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success')
  const [action, setAction] = useState<ReactNode | undefined>(undefined)

  const showSnackbar = (
    msg: string | ReactNode,
    sev: 'success' | 'error' | 'warning' | 'info' = 'success',
    act?: ReactNode
  ) => {
    setMessage(msg)
    setSeverity(sev)
    setAction(act)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
        onClose={handleClose}
        open={open}
      >
        <Alert
          action={
            action || (
              <CancelIcon
                onClick={handleClose}
                style={{
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              />
            )
          }
          onClose={handleClose}
          severity={severity}
          sx={{
            bgcolor: 'background.paper',
            color: '#575F6E',
            width: '500px',
            borderRadius: '16px',
            '& .MuiAlert-action': {
              padding: 0,
              color: 'rgba(197, 197, 197, 0.75)',
              '&:hover': {
                color: 'rgba(197, 197, 197, 1)'
              }
            },
            '& .MuiAlert-icon': {
              padding: 0,
              m: '15px 15px 10px 0',
              fontSize: '30px'
            },
            '& .MuiAlert-message': {
              padding: 0,
              m: '15px 15px 15px 0'
            }
          }}
          variant='outlined'
        >
          <Typography variant='errorText'>{message}</Typography>
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
