/* eslint-disable flowtype/require-valid-file-annotation */

import { create, SheetsRegistry } from 'jss'
import preset from 'jss-preset-default'
import { createMuiTheme } from 'material-ui/styles'
import { purple, green } from 'material-ui/colors'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

// eslint-disable-next-line
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-okaidia.css'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
})

// Configure JSS
const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName

export const sheetsManager = new Map()

export default function createContext () {
  return {
    jss,
    theme,
    sheetsManager,
    sheetsRegistry: new SheetsRegistry(),
  }
}
