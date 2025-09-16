import React from 'react'
import Header from '@/components/layoutClient/Header'
import Footer from '@/components/layoutClient/Footer'

const LayoutProviders = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '85vh' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default LayoutProviders