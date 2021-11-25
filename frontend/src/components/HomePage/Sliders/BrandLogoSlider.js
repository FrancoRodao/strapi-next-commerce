import Slider from 'react-slick'
import styled from 'styled-components'
import Image from 'next/image'

const Container = styled.div`
  text-align: center;

  .slick-track {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`

export default function BrandsSlider() {
  return (
    <Container>
      <Slider
        dots={false}
        arrows={false}
        infinite
        speed={1000}
        slidesToShow={5}
        variableWidth
      >
        <div style={{ width: 30 }}>
          <Image
            height="614"
            width="500"
            layout="intrinsic"
            alt="apple logo"
            src="/apple-logo.png"
          />
        </div>
        <div style={{ width: 90 }}>
          <Image
            height="1218"
            width="3673"
            layout="intrinsic"
            alt="samsung logo"
            src="/samsung-logo.png"
          />
        </div>
        <div style={{ width: 50 }}>
          <Image
            height="1024"
            width="1024"
            layout="intrinsic"
            alt="xiaomi logo"
            src="/xiaomi-logo.png"
          />
        </div>
        <div style={{ width: 100 }}>
          <Image
            height="573"
            width="2400"
            layout="intrinsic"
            alt="nokia logo"
            src="/nokia-logo.png"
          />
        </div>
        <div style={{ width: 55 }}>
          <Image
            height="500"
            width="528"
            layout="intrinsic"
            alt="nokia logo"
            src="/huawei-logo.png"
          />
        </div>
      </Slider>
    </Container>
  )
}
