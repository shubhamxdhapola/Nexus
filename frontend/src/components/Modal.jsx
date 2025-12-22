import React from 'react'

const Modal = ({children}) => {
  return (
    <div className='fixed inset-0 bg-black/30 z-10'>
      {children}
    </div>
  )
}

export default Modal
