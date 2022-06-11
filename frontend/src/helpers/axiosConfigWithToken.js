export function axiosConfigWithToken(accessToken) {
	if (accessToken) {
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	}

	return null
}
