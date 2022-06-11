export function ArrowIcon(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			// eslint-disable-next-line react/destructuring-assignment
			style={{ display: 'block', fill: 'rgba(0, 0, 0, 1)', ...props.style }}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		>
			<path d='M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z' />
		</svg>
	)
}
