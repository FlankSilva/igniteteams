import { Container } from './styles'

interface BoxProps {
  children: JSX.Element | JSX.Element[]
}

export function Box({ children }: BoxProps) {
  return <Container>{children}</Container>
}
