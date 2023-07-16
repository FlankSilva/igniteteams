import logoImg from '@assets/logo.png'
import { BackIcon, Container, Logo, BackButton } from './styles'

interface HeadeProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeadeProps) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
