
import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {

root: {
  flex: 1,
  display: 'flex',
  minHeight: 900,
},

  sidebar: {
    width: 300,
    mr: '32px',
    borderRadius: '32px',
    p: 0,
    display: 'flex',
    flexDirection: 'column',
    bgcolor: '#f4f4f4',
    overflow: 'hidden',
  },


  searchWrapper: {
    backgroundColor: '#575F6E',
    borderTopLeftRadius: '32px',
    borderTopRightRadius: '32px',
    p: 2,
    mb:'10px'
  },

  list: {
    flex: 1,
    overflowY: 'auto',
    minHeight: 0,
    p: 2,
    pt: 0,
    bgcolor: '#f4f4f4',
  },

  chatItemInactive: {
    display: 'flex',
    alignItems: 'center',
    p: 1.5,
    mb: 1,
    borderRadius: '16px',
    bgcolor: '#575F6E',  
    cursor: 'pointer',
  },

  chatItemActive: {
    display: 'flex',
    alignItems: 'center',
    p: 1.5,
    mb: 1,
    borderRadius: '16px',
    bgcolor: '#8D96A6',  
    cursor: 'pointer',
  },

  avatar: {
    width: 40,
    height: 40,
  },

  username: {
    ml: 2,
    color: '#fff',
    fontWeight: 500,
    fontSize: '1rem',
  },


  statusDot: {
    ml: 'auto',
    width: 12,
    height: 12,
    borderRadius: '50%',
    bgcolor: 'success.main',
  },

  chatWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    p: 2,
    color: 'error.main',
  },
}
