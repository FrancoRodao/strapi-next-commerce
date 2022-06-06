import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 136px;
  height: 275px;
  margin: 0 auto 15px auto;
`

export default function ProductImage({ image }) {
  return (
    <Container>
      <Image
        alt={image?.name?.split('.')[0]}
        src={image?.url}
        layout="fill"
        objectFit="cover"
      />
    </Container>
  )
}
