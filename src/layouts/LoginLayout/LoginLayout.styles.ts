import { SxProps, Theme } from '@mui/material/styles'
export const styles: { [key: string]: SxProps<Theme> } = {
    container: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      avatar: {
        m: 1,
        bgcolor: 'secondary.main'
      },
      form: {
        mt: 1
      },
      submitButton: {
        mt: 3,
        mb: 2
      }
}
