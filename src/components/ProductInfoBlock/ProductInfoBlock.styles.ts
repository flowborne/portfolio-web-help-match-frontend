import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  root: {
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  avatar: {
    bgcolor: 'primary.light',
    mr: 1,
  },
  userName: {
    fontWeight: 500,
  },
  chatButton: {
    ml: 'auto',
    p: 0.5,
  },
  description: {
    lineHeight: 1.6,
    mb: 2,
  },
}
