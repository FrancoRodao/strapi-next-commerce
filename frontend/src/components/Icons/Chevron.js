export function ChevronIcon({ color, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ fill: color || 'rgba(0, 0, 0, 0.3)' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
    </svg>
  )
}
