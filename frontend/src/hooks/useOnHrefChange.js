import { useEffect } from 'react'
import { isClientSide } from '../helpers/isClientSide'

export function useOnHrefChange(callback) {
	let observer

	useEffect(() => {
		if (isClientSide()) {
			let previousUrl = window.location.href

			observer = new MutationObserver(() => {
				if (window.location.href !== previousUrl) {
					callback()
					previousUrl = window.location.href
				}
			})

			const target = document.querySelector('#__next')
			observer.observe(target, {
				childList: false,
				subtree: true,
				characterData: true,
				attributes: false
			})
		}

		return () => isClientSide() && observer.disconnect()
	}, [])
}
