import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  commonFieldStyles:{
    '.MuiOutlinedInput-root': {
      borderRadius: '24px',
      backgroundColor: '#fafafa',
      paddingLeft: '16px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
      }
    },
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
}
