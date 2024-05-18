import {
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import Footer from './footer'
import Footnote from './footnote'

const baseUrl = 'https://plutus.francismasha.com'

export function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Plutus</Preview>
      <Section style={main}>
        <Container style={container}>
          <Section style={{ marginTop: '20px' }}>
            <Img
              src={`${baseUrl}/logo.svg`}
              width="50"
              height="50"
              alt="Logo"
              className="block m-auto"
            />
          </Section>
          <Text style={{ ...h1, marginTop: '20px' }}>Welcome to Plutus</Text>
          <Text style={text}>
            Hi, I{"'"}m Masha, creator of the Plutus, an open-source app to
            deliver financial clarity through spending analysis. We are excited
            to have you on board.
          </Text>

          <Footnote />
          <Footer />
        </Container>
      </Section>
    </Html>
  )
}

const main = {
  backgroundColor: '#efeef1',
  margin: '0 auto',
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '5px',
  margin: '40px auto',
  padding: '20px',
  width: '465px',
}

const _logo = {
  margin: '0 auto',
}

const h1 = {
  color: '#000',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: '500',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
}

const _link = {
  color: '#0669ce',
  textDecoration: 'none',
}

const text = {
  color: '#000',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  lineHeight: '24px',
}
