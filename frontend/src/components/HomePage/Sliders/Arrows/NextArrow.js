import styled from 'styled-components'

const ArrowDiv = styled.div`
	&::before {
		color: blue;
	}
`

export default function NextArrow(props) {
	// eslint-disable-next-line react/prop-types
	const { className, style, onClick } = props

	return (
		<ArrowDiv
			className={className}
			style={{ ...style, color: 'blue', right: '15px' }}
			onClick={onClick}
		/>
	)
}
