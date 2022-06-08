import Slider from 'react-slick'
import styled from 'styled-components'
import Image from 'next/image'

const Container = styled.div`
  text-align: center;

  .slick-track {
    display: flex;
    align-items: center;
    gap: 200px;
  }

  @media (min-width: 320px) {
    .slick-track {
      gap: 80px;
    }
  }
`

export default function BrandsSlider() {
  return (
    <Container>
      <Slider
        dots={false}
        arrows={false}
        infinite
        slidesToShow={1}
        slidesToScroll={1}
        variableWidth
        autoplay
        autoplaySpeed={1000}
        draggable={false}
        touchMove={false}
        pauseOnHover={false}
      >
        <div style={{ width: '40px' }}>
          <Image
            height="614"
            width="500"
            layout="intrinsic"
            alt="apple logo"
            src="/apple-logo.png"
            objectFit="cover"
          />
        </div>
        <div style={{ width: '100px' }}>
          <Image
            height="1218"
            width="3673"
            layout="intrinsic"
            alt="samsung logo"
            src="/samsung-logo.png"
            objectFit="cover"
          />
        </div>

        <div style={{ width: '55px' }}>
          <Image
            height="1024"
            width="1024"
            layout="intrinsic"
            alt="xiaomi logo"
            src="/xiaomi-logo.png"
            objectFit="cover"
          />
        </div>

        <div style={{ width: '100px' }}>
          <Image
            height="573"
            width="2400"
            layout="intrinsic"
            alt="nokia logo"
            src="/nokia-logo.png"
            objectFit="cover"
          />
        </div>

        <div style={{ width: '50px' }}>
          <Image
            height="500"
            width="528"
            layout="intrinsic"
            alt="nokia logo"
            src="/huawei-logo.png"
            objectFit="cover"
          />
        </div>

        {/* copys */}
        <div style={{ width: '40px' }}>
          <Image
            height="614"
            width="500"
            layout="intrinsic"
            alt="apple logo"
            src="/apple-logo.png"
            objectFit="cover"
          />
        </div>
        <div style={{ width: '100px' }}>
          <Image
            height="1218"
            width="3673"
            layout="intrinsic"
            alt="samsung logo"
            src="/samsung-logo.png"
            objectFit="cover"
          />
        </div>

        <div style={{ width: '55px' }}>
          <Image
            height="1024"
            width="1024"
            layout="intrinsic"
            alt="xiaomi logo"
            src="/xiaomi-logo.png"
            objectFit="cover"
          />
        </div>

        <div style={{ width: '100px' }}>
          <Image
            height="573"
            width="2400"
            layout="intrinsic"
            alt="nokia logo"
            src="/nokia-logo.png"
            objectFit="cover"
          />
        </div>

        <div style={{ width: '50px' }}>
          <Image
            height="500"
            width="528"
            layout="intrinsic"
            alt="nokia logo"
            src="/huawei-logo.png"
            objectFit="cover"
          />
        </div>
      </Slider>
    </Container>
  )
}
