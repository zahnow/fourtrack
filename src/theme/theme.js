// theme.js

// 1. import `extendTheme` function
import { extendTheme, theme as base } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// 2. Add your color mode config
const theme = extendTheme({
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
  layerStyles: {
    outerContainer: {
      width: 'container.xl',
      mt: '16px',
      p: '16px',
            // border: "2px solid",
            // borderColor: "gray.500",
      rounded: '16px',
      minHeight: '85vh'
    },
    innerContainer: {
      width: 'container.lg',
      mt: '16px',
      p: '16px',
      border: "2px solid",
      borderColor: "gray.500",
      rounded: '16px'
    },
    commentContainer: {
      width: 'container.md',
      mt: '16px',
      p: '16px',
      border: "2px solid",
      borderColor: "gray.500",
      bg: "gray.700",
      color: "white",
      rounded: '16px'
    },
    cardContainer: {
      maxW: 'md',
      maxH: 'xl',
      mt: '16px',
      p: '16px',
      pt: '48px',
      bg: 'gray.700',
      color: 'white',
      rounded: '16px'
    },
    selected: {
      bg: mode("teal.500", "red.200"),
      color: "teal.700",
      borderColor: "orange.500",
    },
  },
  textStyles: {
    pageHeader: {
      fontFamily: `'Rubik', ${base.fonts.heading}`,
      fontSize: '7xl',
      textAlign: 'center',
      bgGradient: 'linear(to-tl, #8A2387, #E94057, #F27121)',
      bgClip: 'text',
      bgSize: 'cover',
      fontWeight: 'bolder',
      marginTop: '0',
      //lineHeight: '1'
    },
    subHeader: {
      fontFamily: `'Inter', ${base.fonts.heading}`,
      fontSize: '4xl',
      fontWeight: 'bolder'
    }
  },
  components: {
    Button: {   //Example of adding a new custom variant to Button
      variants: {
        pill: (props) => ({
          ...base.components.Button.variants.outline(props),
          rounded: 'full',
          color: 'gray.500',
        })
      },
    },
    Box: {
      variants: {
        card: {
          baseStyle: ({ colorMode }) => ({
            bg: colorMode === 'dark' ? 'green.300' : 'green.500',
            color: colorMode === 'dark' ? 'gray.800' : 'white',
            textTransform: 'uppercase',
            fontWeight: 'semibold',
            letterSpacing: '0.02em',
            padding: '4px',
            borderRadius: '2px',
            fontSize: '12px',
          })
        }
      }
    }
  }
});

export default theme