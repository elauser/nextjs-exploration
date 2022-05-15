import React from 'react'
import { useRouter } from 'next/router'

const SelectedProjectPage = () => {
  const router = useRouter()
  return (
    <>
      <div>SelectedProjectPage</div>
      <span>
        {JSON.stringify(router.query)}
      </span>
    </>
  )
}

export default SelectedProjectPage