import { instance } from './instance'

function updateProfileImage({ file }) {
	const formData = new FormData()
	formData.append('files.image', file)
	formData.append('data', JSON.stringify({ name: 'userProfileImage' }))

	return instance
		.put('/users/me/profile/image', formData)
		.then((res) => res.data)
}

function changeUserEmail({ email }) {
	return instance
		.put('/users/me/profile/email', { email })
		.then((res) => res.data)
}

function changeUserUsername({ username }) {
	return instance
		.put('/users/me/profile/username', { username })
		.then((res) => res.data)
}

function changeUserPassword({ password }) {
	return instance
		.put('/users/me/profile/password', { password })
		.then((res) => res.data)
}

export const ProfileAPI = {
	updateProfileImage,
	changeUserEmail,
	changeUserUsername,
	changeUserPassword
}
