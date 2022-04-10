import { useTheme } from 'styled-components'

export function FilterIcon() {
  const { blue } = useTheme()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19px"
      height="19px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="Iconly/Curved/Filter">
        <g id="Filter">
          <path
            id="Stroke 1"
            d="M11.1437 17.8829H4.67114"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.205 17.8839C15.205 19.9257 15.8859 20.6057 17.9267 20.6057C19.9676 20.6057 20.6485 19.9257 20.6485 17.8839C20.6485 15.8421 19.9676 15.1621 17.9267 15.1621C15.8859 15.1621 15.205 15.8421 15.205 17.8839Z"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 5"
            d="M14.1765 7.39439H20.6481"
            stroke={blue}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Stroke 7"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.1153 7.39293C10.1153 5.35204 9.43436 4.67114 7.39346 4.67114C5.35167 4.67114 4.67078 5.35204 4.67078 7.39293C4.67078 9.43472 5.35167 10.1147 7.39346 10.1147C9.43436 10.1147 10.1153 9.43472 10.1153 7.39293Z"
            stroke="#3483fa"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}
