import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function Portal({ children, selectorId }) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)

		return () => setMounted(false)
	}, [])

	return mounted
		? createPortal(children, document.getElementById(selectorId))
		: null
}
