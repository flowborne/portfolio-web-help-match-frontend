// src/components/Chat.styles.ts
import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    p: 2,
    mb: 1,
    borderRadius: '16px',
    color: 'white',
    bgcolor: '#575F6E',
  },
  messagesWrapper: {
    flex: 1,
    p: 2,
    overflow: 'auto',
    bgcolor: '#f4f4f4',
    minHeight: 0,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    p: 2,
    mb: 1,
    borderRadius: '16px',
    color: 'white',
    bgcolor: '#575F6E',
  },
  avatar: {
    width: 36,
    height: 36,
    mx: 1,
    fontSize: 14,
  },
  bubble: {
    display: 'inline-block',          
    px: 2,
    py: 1.5,
    boxShadow: 1,
    overflowWrap: 'break-word',      
    wordBreak: 'break-word',
    width: 'fit-content',           
    maxWidth: '100%',                 
  },
  timestamp: {
  ml: 1,
  fontSize: '0.6rem',
  opacity: 0.7,
  flexShrink: 0,
},
}
