import styled from 'styled-components'

const SVGIcon = styled.svg`
	display: block;
	fill: rgb(227, 38, 54);
	transition: fill 0.5s;

	&:hover {
		fill: rgb(255, 0, 0);
	}
`

export function CloseIcon() {
	return (
		<SVGIcon
			xmlns='http://www.w3.org/2000/svg'
			width='30'
			height='30'
			viewBox='0 0 24 24'
		>
			<path d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z' />
		</SVGIcon>
	)
}
