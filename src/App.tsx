import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '~themes/theme'
import RoutesComponent from './router/router'
import { DataProvider } from '~data/Data-provider'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataProvider>
        <RoutesComponent />
      </DataProvider>
    </ThemeProvider>
  )
}

