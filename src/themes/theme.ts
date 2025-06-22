import { createTheme } from '@mui/material/styles'
import '@fontsource/poppins'
import '@fontsource/reenie-beanie'
import '@fontsource/golos-text'
import React from 'react'

declare module '@mui/material' {
  interface ButtonPropsVariantOverrides {
    simpleWhite: true
    simplePink: true
    primaryVariant3: true
    primaryVariant4: true
    primaryVariant5: true
    primaryVariant6: true
    primaryVariant7: true
    primaryVariant8: true
    bodyTextSecondary: React.CSSProperties
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    simpleWhite: true
    simplePink: true
    primaryVariant3: true
    primaryVariant4: true
    primaryVariant5: true
    primaryVariant6: true
    primaryVariant7: true
    primaryVariant8: true
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    bodyTextSecondary: React.CSSProperties
    captionText: React.CSSProperties
    heroTitle: React.CSSProperties
    heroTitleAccent: React.CSSProperties
    heroSecondary: React.CSSProperties
    heroSecondaryAccent: React.CSSProperties
    reenieTitle: React.CSSProperties
    landingTitle: React.CSSProperties
    landingPrimary: React.CSSProperties
    landingDescription: React.CSSProperties
    landingFooterText: React.CSSProperties
    landingDemoFooterText: React.CSSProperties
    errorText: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    bodyTextSecondary?: React.CSSProperties
    captionText?: React.CSSProperties
    heroTitle?: React.CSSProperties
    heroTitleAccent?: React.CSSProperties
    heroSecondary?: React.CSSProperties
    heroSecondaryAccent?: React.CSSProperties
    reenieTitle?: React.CSSProperties
    landingTitle?: React.CSSProperties
    landingPrimary?: React.CSSProperties
    landingDescription?: React.CSSProperties
    landingFooterText?: React.CSSProperties
    landingDemoFooterText?: React.CSSProperties
    errorText?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyTextSecondary: true
    captionText: true
    heroTitle: true
    heroTitleAccent: true
    heroSecondary: true
    heroSecondaryAccent: true
    reenieTitle: true
    landingTitle: true
    landingPrimary: true
    landingDescription: true
    landingFooterText: true
    landingDemoFooterText: true
    errorText: true
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1278,
      xl: 1536
    }
  },
  typography: {
    fontFamily: "'Poppins', 'Golos Text'",
    bodyTextSecondary: {
      color: '#575F6E'
    },
    captionText: {
      color: '#463D4B',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '24px'
    },
    heroTitle: {
      color: '#242426',
      fontSize: '85px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '125px'
    },
    heroTitleAccent: {
      color: '#99150E',
      fontSize: '85px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '125px'
    },
    heroSecondary: {
      color: '#575F6E',
      fontSize: '27px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '50px'
    },
    heroSecondaryAccent: {
      color: '#575F6E',
      fontSize: '27px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '50px'
    },
    landingTitle: {
      color: '#575F6E',
      fontSize: '50px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '120px'
    },
    landingPrimary: {
      color: '#242426',
      fontSize: '25px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '35px'
    },
    landingDescription: {
      color: '#575F6E',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '28px'
    },
    errorText: {
      color: '#575F6E',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '28px'
    },
    landingFooterText: {
      color: '#FFF',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '28px',
      marginRight: '20px'
    },
    landingDemoFooterText: {
      color: '#8D96A6',
      fontSize: '30px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '28px',
      marginRight: '20px'
    },
    reenieTitle: {
      color: '#99150E',
      fontFamily: 'Reenie Beanie',
      fontSize: '55px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '18px'
    }
  },
  palette: {
    primary: {
      main: '#99150E'
    },
    secondary: {
      main: '#edf2ff'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#fff',
          '&.Mui-focused': {
            backgroundColor: '#fff'
          },
          '&.Mui-focused:hover': {
            backgroundColor: '#fff'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#878686'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#878686'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#878686'
          }
        },
        input: {
          color: '#575F6E',
          '&:-webkit-autofill': {
            boxShadow: '0 0 0 1000px #fff inset !important',
            WebkitTextFillColor: '#575F6E',
            transition: 'background-color 5000s ease-in-out 0s'
          }
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#575F6E',
          '&.Mui-focused': {
            color: 'rgba(117, 137, 176, 0.70)'
          },
          '&.MuiFormLabel-filled': {
            color: 'rgba(117, 137, 176, 0.70)'
          }
        }
      }
    },

    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: { textTransform: 'capitalize' }
        },
        {
          props: { variant: 'contained' },
          style: { textTransform: 'capitalize' }
        },
        {
          props: { variant: 'simpleWhite' },
          style: {
            backgroundColor: '#fff',
            color: '#575F6E',
            borderRadius: 8,
            padding: '6px 12px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#99150E',
              color: '#fff'
            },
            '&:active': {
              backgroundColor: '#99150E',
              color: '#fff'
            },
            '&:focused': {
              backgroundColor: '#99150E',
              color: '#fff'
            }
          }
        },
        {
          props: { variant: 'simplePink' },
          style: {
            backgroundColor: '#99150E',
            color: '#fff',
            borderRadius: 8,
            padding: '6px 12px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#99150E',
              color: '#fff'
            },
            '&:active': {
              backgroundColor: '#99150E',
              color: '#fff'
            },
            '&:focused': {
              backgroundColor: '#99150E',
              color: '#fff'
            }
          }
        },
        {
          props: { variant: 'primaryVariant3' },
          style: {
            color: '#99150E',
            padding: '13px 40px',
            borderRadius: '8px',
            border: '1px solid #99150E',
            background: '#FFF',
            textTransform: 'none',
            fontSize: '20px',
            lineHeight: '24px',
            '&:hover': {
              color: '#FFF',
              background: '#D4D4D4',
              borderColor: '#D4D4D4'
            }
          }
        },
        {
          props: { variant: 'primaryVariant4' },
          style: {
            color: '#FFF',
            padding: '14px 40px',
            borderRadius: '8px',
            background: '#99150E',
            textTransform: 'none',
            fontSize: '20px',
            lineHeight: '24px',
            '&:hover': {
              background: '#B12F56'
            }
          }
        },
        {
          props: { variant: 'primaryVariant5' },
          style: {
            color: '#FFF',
            padding: '24px 48px',
            borderRadius: '8px',
            background: '#99150E',
            textTransform: 'none',
            fontSize: '25px',
            lineHeight: '24px',
            fontWeight: 600,
            '&:hover': {
              background: '#B12F56'
            }
          }
        },
        {
          props: { variant: 'primaryVariant6' },
          style: {
            backgroundColor: '#99150E',
            color: 'white',
            padding: '0px 50px 0px 50px',
            borderRadius: '16px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: '#99150E'
            },
            '& .MuiButton-startIcon': {
              marginRight: '8px'
            }
          }
        },
        {
          props: { variant: 'primaryVariant6', disabled: true },
          style: {
            backgroundColor: '#B6C0C7',
            color: '#ffffff !important',
            cursor: 'not-allowed',
            '&:hover': {
              backgroundColor: '#B6C0C7'
            }
          }
        },
        {
          props: { variant: 'primaryVariant7' },
          style: {
            color: '#99150E',
            padding: '0px 50px 0px 50px',
            height: '56px',
            borderRadius: '16px',
            border: '1px solid #99150E',
            background: '#FFF',
            textTransform: 'capitalize',
            '&:hover': {
              color: '#99150E',
              background: '#FFF',
              border: '1px solid #99150E'
            },
            '&.Mui-disabled': {
              border: '1px solid #A0A0A0'
            }
          }
        },
        {
          props: { variant: 'primaryVariant8' },
          style: {
            color: '#99150E',
            height: '56px',
            borderRadius: '16px',
            border: '1px solid #99150E',
            background: '#FFF',
            textTransform: 'capitalize',
            '&:hover': {
              color: '#99150E',
              background: '#FFF',
              border: '1px solid #99150E'
            },
            '&.Mui-disabled': {
              border: '1px solid #A0A0A0'
            }
          }
        }
      ]
    }
  }
})
