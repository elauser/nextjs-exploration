import React from 'react'
import { useRouter } from 'next/router'

const ClientProjectsPage = () => {
  const router = useRouter()

  console.log(router.query)
  const loadProjectHandler = () => {
    router.push('/clients/max/projectA')
  }

  return (
    <>
    <div>ClientProjectsPage</div>
    <button onClick={loadProjectHandler}>Load Project A</button>
    </>
  )
}

export default ClientProjectsPage