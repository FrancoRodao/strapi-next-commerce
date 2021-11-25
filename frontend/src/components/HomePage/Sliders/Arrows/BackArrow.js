import styled from 'styled-components'

const ArrowDiv = styled.div`
  &::before {
    color: blue;
  }
`

export default function BackArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props

  return (
    <ArrowDiv
      className={className}
      style={{
        ...style,
        color: 'blue',
        left: '15px',
        zIndex: 1,
        backgroundColor: 'transparent'
      }}
      onClick={onClick}
    />
  )
}
