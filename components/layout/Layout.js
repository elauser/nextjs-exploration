import React from 'react'
import MainHeader from './MainHeader'

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      {props.children}
    </>
  )
}

export default Layout