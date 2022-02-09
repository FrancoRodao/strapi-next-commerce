import styled from 'styled-components'

const Container = styled.span`
  height: 100%;
  min-height: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 3.75em;
    transform-origin: center;
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: ${({ theme }) => theme.blue};
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dashoffset: -125px;
    }
  }
`

export default function Loading({ children }) {
  return (
    <Container>
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" />
      </svg>
      {children}
    </Container>
  )
}
