import logoImg from '@assets/logo.png'
import { BackIcon, Container, Logo, BackButton } from './styles'
import { useNavigation } from '@react-navigation/native'

interface HeadeProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeadeProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
