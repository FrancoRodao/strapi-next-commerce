import { useState } from 'react'

export function useChangingPage() {
  const [changingPage, setChangingPage] = useState(false)

  return {
    changingPage,
    setChangingPage
  }
}
