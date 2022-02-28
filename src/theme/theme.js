// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const theme = extendTheme( {
  initialColorMode: 'light',
  useSystemColorMode: true,
  colors: {
    brand: {
      400: '#CC0000',
      500: '#FF0000'
    },
  },
})

export default theme