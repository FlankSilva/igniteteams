import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import theme from './src/theme'

import { Players } from '@screens/Players'
import { Loading } from '@components/Loading'

export default function App() {
  const [fonstLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fonstLoaded) {
    return <Loading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {<Players />}
    </ThemeProvider>
  )
}
