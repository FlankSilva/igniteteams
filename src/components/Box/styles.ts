import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0 24px;
  padding-bottom: 42px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`
