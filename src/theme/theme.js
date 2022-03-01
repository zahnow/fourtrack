// theme.js

// 1. import `extendTheme` function
import { extendTheme, theme as base } from '@chakra-ui/react'

// 2. Add your color mode config
const theme = extendTheme( {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      400: '#CC0000',
      500: '#FF0000'
    },
  },
  fonts: {
    heading: `'Rubik', ${base.fonts.heading}`,
    body: `'Inter', ${base.fonts.body}`
  },
  textStyles: {
    pageHeader: {
      fontSize: ['4xl'],
      color: 'red.500',
      fontWeight: 'bolder'
    },
  },
  components: {
    Button: {   //Example of adding a new custom variant to Button
      variants: {
        pill: (props) => ({
          ...base.components.Button.variants.outline(props),
          rounded: 'full',
          color: 'gray.500',
        })
      }
    }
  }
});

export default theme